import json
from django.db import models, connection, transaction
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_delete,post_save,pre_delete
import logging
from django.forms import ValidationError
from django.db.models import JSONField  
logger = logging.getLogger(__name__)


#CATEGORY

class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    def __str__(self):
        return self.name

    def delete(self, *args, **kwargs):
        # Get all tables associated with this category
        tables = self.tables.all()
        for table in tables:
            table.delete()  # This will invoke the delete method of Table, which handles the deletion of the veritable table
        super().delete(*args, **kwargs)

@receiver(pre_delete, sender=Category)
def delete_related_tables(sender, instance, **kwargs):
    tables = instance.tables.all()
    for table in tables:
        table.delete()

#TABLE
    
class Table(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='tables', on_delete=models.SET_NULL, null=True)
   
    def __init__(self, *args, **kwargs):
        super(Table, self).__init__(*args, **kwargs)
        self.old_name = self.name

    def save(self, *args, **kwargs):
        creating = self._state.adding
        if creating:
            if Table.objects.filter(name=self.name).exists():
                logger.error(f"A table with the name '{self.name}' already exists.")
                raise ValidationError(f"A table with the name '{self.name}' already exists.")
        else:
            if self.old_name and self.old_name != self.name:
                if Table.objects.exclude(pk=self.pk).filter(name=self.name).exists():
                    logger.error(f"A table with the name '{self.name}' already exists.")
                    raise ValidationError(f"A table with the name '{self.name}' already exists.")

        super().save(*args, **kwargs)
        if creating:
            self.create_veritable_table()
            self.ensure_categories()
        else:
            if self.old_name and self.old_name != self.name:
                self.rename_veritable_table()
    
    def ensure_categories(self):
        if not self.category:
            default_category = Category.objects.create(name='Default')
            self.category = default_category

    def delete(self, *args, **kwargs):

        with transaction.atomic():
            self.fields.all().delete()
            self.delete_veritable_table()
            super().delete(*args, **kwargs)


    def create_veritable_table(self):
        table_name = self.get_normalized_name(self.name)
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} (id serial PRIMARY KEY);")
        except Exception as e:
            logger.error(f"Error creating table {table_name}: {e}")

    def rename_veritable_table(self):
        old_table_name = self.get_normalized_name(self.old_name)
        new_table_name = self.get_normalized_name(self.name)
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"ALTER TABLE {old_table_name} RENAME TO {new_table_name};")
        except Exception as e:
            logger.error(f"Error renaming table from {old_table_name} to {new_table_name}: {e}")

    def delete_veritable_table(self):
        table_name = self.get_normalized_name(self.name)
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"SELECT to_regclass('{table_name}') IS NOT NULL;")
                if cursor.fetchone()[0]:  # Only proceed if the table exists
                    cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE;")
        except Exception as e:
            logger.error(f"Error dropping table {table_name}: {e}")
            raise

    @staticmethod
    def get_normalized_name(name):
        return f"{name.lower().replace(' ', '_')}"

    @staticmethod
    def retrieve_veritable_table_data(table_name):
        normalized_table_name = Table.get_normalized_name(table_name)
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"SELECT * FROM {normalized_table_name};")
                rows = cursor.fetchall()
            return rows
        except Exception as e:
            logger.error(f"Error retrieving data from table {normalized_table_name}: {e}")
            return []

@receiver(pre_save, sender=Table)
def set_old_name(sender, instance, **kwargs):
    if instance.pk:
        instance.old_name = Table.objects.get(pk=instance.pk).name

#FIELD

class FieldType(models.TextChoices):
    TEXT = 'TEXT', 'Text'
    INTEGER = 'INTEGER', 'Integer'
    DATE = 'DATE', 'Date'
    BOOLEAN = 'BOOLEAN', 'Boolean'
    LIST = 'LIST', 'List'
    IMAGE = 'IMAGE', 'Image'

class Field(models.Model):
    name = models.CharField(max_length=100)
    field_type = models.CharField(max_length=50, choices=FieldType.choices, default=FieldType.TEXT)
    table = models.ForeignKey(Table, related_name='fields', on_delete=models.CASCADE)
    list_values = models.JSONField(default=list, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        creating = self._state.adding
        super().save(*args, **kwargs)
        if creating:
            self.add_field_to_veritable_table()


    def add_field_to_veritable_table(self):
        table_name = self.table.get_normalized_name(self.table.name)
        column_name = self.get_normalized_name(self.name)
        column_type = self.field_type

        if self.field_type == FieldType.TEXT:
            column_type = 'TEXT'
        elif self.field_type == FieldType.INTEGER:
            column_type = 'INTEGER'
        elif self.field_type == FieldType.DATE:
            column_type = 'DATE'
        elif self.field_type == FieldType.BOOLEAN:
            column_type = 'BOOLEAN'
        elif self.field_type == FieldType.LIST:
            column_type = 'JSONB'
        elif self.field_type == FieldType.IMAGE:
            column_type = 'VARCHAR(255)'
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_type};")
        except Exception as e:
            logger.error(f"Error adding column {column_name} to table {table_name}: {e}")

    
    @staticmethod
    def get_normalized_name(name):
        import re
        # Replace all non-alphanumeric characters with underscores
        normalized_name = re.sub(r'\W+', '_', name)
        return normalized_name.lower()

@receiver(post_save, sender=Field)
def update_field_in_veritable_table(sender, instance, **kwargs):
    if instance._old_name and instance._old_field_type:
        table_name = instance.table.get_normalized_name(instance.table.name)
        old_column_name = Field.get_normalized_name(instance._old_name)
        new_column_name = Field.get_normalized_name(instance.name)
        column_type_change = instance._old_field_type != instance.field_type

        try:
            with connection.cursor() as cursor:
                if instance._old_name != instance.name:
                    cursor.execute(f"ALTER TABLE {table_name} RENAME COLUMN {old_column_name} TO {new_column_name};")
                if column_type_change:
                    new_field_type = 'jsonb' if instance.field_type == FieldType.LIST else instance.field_type
                    cursor.execute(f"ALTER TABLE {table_name} ALTER COLUMN {new_column_name} TYPE {new_field_type};")
        except Exception as e:
            logger.error(f"Error updating column in table {table_name}: {e}")

@receiver(pre_save, sender=Field)
def set_old_field_details(sender, instance, **kwargs):
    if instance.pk:
        old_instance = Field.objects.get(pk=instance.pk)
        instance._old_name = old_instance.name
        instance._old_field_type = old_instance.field_type
    else:
        instance._old_name = None
        instance._old_field_type = None

@receiver(post_delete, sender=Field)
def delete_field_from_veritable_table(sender, instance, **kwargs):
    with transaction.atomic():
        table_name = instance.table.get_normalized_name(instance.table.name)
        field_name = instance.get_normalized_name(instance.name)
        try:
            with connection.cursor() as cursor:
                # Attempt to drop the column from the actual database table
                cursor.execute(f"ALTER TABLE {table_name} DROP COLUMN IF EXISTS {field_name};")

            # Iterate through each Data instance related to the table
            for data in Data.objects.filter(table=instance.table):
                if field_name in data.details:
                    # Remove the field from the details JSON
                    del data.details[field_name]
                
                # If details are now empty, delete the Data instance
                if not data.details:
                    data.delete()  # This deletes the row from the Data table
                else:
                    # Save the updated Data instance only if details are not empty
                    data.save()

        except Exception as e:
            logger.error(f"Error while deleting field {field_name} from table {table_name}: {e}")
# DATA
class Data(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name='datas')
    details = JSONField() 

    def save(self, *args, **kwargs):
        is_new = self._state.adding
        super().save(*args, **kwargs)

        table_name = self.table.get_normalized_name(self.table.name)

        if is_new:
            self.insert_row_into_veritable_table(table_name)
        else:
            self.update_row_in_veritable_table(table_name)

    def insert_row_into_veritable_table(self, table_name):
        details_dict = self.details if isinstance(self.details, dict) else {}

        if not details_dict:
            logger.error("No data provided for insertion into table {}. Skipping insertion.".format(table_name))
            return

        columns = ', '.join([self.table.get_normalized_name(key) for key in details_dict.keys()])
        values = []
        for key, value in details_dict.items():
            if isinstance(value, (dict, list)):
                # Serialize dict or list to a JSON string
                value = json.dumps(value)
            elif isinstance(value, str) and self.table.fields.filter(name=key, field_type=FieldType.LIST).exists():
                # Ensure strings intended for JSON columns are properly quoted
                value = json.dumps(value)
            values.append(value)
        placeholders = ', '.join(['%s'] * len(values))

        query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders});"

        logger.debug("Executing query: {} with values {}".format(query, values))

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, values)
        except Exception as e:
            logger.error("Error inserting row into {}: {}".format(table_name, e))
    
    def update_row_in_veritable_table(self, table_name):
        details_dict = self.details if isinstance(self.details, dict) else {}

        # Using Django model's primary key if 'id' is not provided in details
        data_id = details_dict.pop('id', self.id)  # self.id refers to Data model's own ID

        # Construct the SET clause for the SQL UPDATE statement
        if not details_dict:
            logger.error("No details provided for updating table {}. Skipping update.".format(table_name))
            return

        set_clause = ', '.join([f"{self.table.get_normalized_name(key)} = %s" for key in details_dict])
        values = list(details_dict.values()) + [data_id]  # Gather new values and add the 'id' at the end for the WHERE clause

        # Build the SQL UPDATE query
        query = f"UPDATE {table_name} SET {set_clause} WHERE id = %s;"

        # Log the query and values for debugging purposes
        logger.debug("Executing query: {} with values {}".format(query, values))

        # Execute the query
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, values)
                if cursor.rowcount == 0:
                    # If no rows are updated, it could indicate the row doesn't exist
                    logger.warning(f"No rows updated. Does the row with id {data_id} exist in table {table_name}?")
        except Exception as e:
            logger.error(f"Error updating row in {table_name}: {e}")

    @staticmethod
    def get_normalized_name(name):
        return f"{name.lower().replace(' ', '_')}"
    
    
@receiver(post_delete, sender=Data)
def delete_data_from_veritable_table(sender, instance, **kwargs):
    table_name = instance.table.get_normalized_name(instance.table.name)
    data_id = instance.id  # Assuming 'id' in Data corresponds to the primary key in the veritable table

    with transaction.atomic():
        try:
            with connection.cursor() as cursor:
                # Check if the row exists before trying to delete it
                cursor.execute(f"SELECT EXISTS (SELECT 1 FROM {table_name} WHERE id = %s);", [data_id])
                if cursor.fetchone()[0]:
                    # Delete the row from the veritable table
                    cursor.execute(f"DELETE FROM {table_name} WHERE id = %s;", [data_id])
                else:
                    logger.error(f"No row found in {table_name} with ID {data_id}")
        except Exception as e:
            logger.error(f"Error deleting row from table {table_name}: {e}")
            raise