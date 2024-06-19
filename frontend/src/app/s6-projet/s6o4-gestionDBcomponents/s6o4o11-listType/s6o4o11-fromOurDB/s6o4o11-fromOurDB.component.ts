import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { S_TableService } from 'src/app/s6-projet/services/TableService/Table.service';
import { S_CategoryService } from 'src/app/s6-projet/services/categService/Category.service';

@Component({
  selector: 'app-s6o4o11-fromOurDB',
  templateUrl: './s6o4o11-fromOurDB.component.html',
  styleUrls: ['./s6o4o11-fromOurDB.component.css']
})
export class S6o4o11FromOurDBComponent implements OnInit {
  @Output() listValuesUpdated = new EventEmitter<string[]>();
  categories: any[] = [];
  selectedCategory: any;
  tables: any[] = [];
  selectedTable: any;
  fields: any[] = [];
  selectedField: any;
  lastSelectedListValues: string[] = [];
  relatedFields: any[] = [];
  constructor(public dialogRef: MatDialogRef<S6o4o11FromOurDBComponent>,    private V_tableService: S_TableService, private V_categoryService: S_CategoryService ) { }

  ngOnInit() {
    this.TS_loadCategories();
  }

  TS_loadCategories(): void {
    this.V_categoryService.S_getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  TS_onCategorySelected(): void {
    this.V_tableService.S_getTablesByCategoryId(this.selectedCategory.id).subscribe(tables => {
      this.tables = tables;
      this.selectedTable = null;
      this.fields = [];
    });
  }

  TS_onTableSelected(): void {
    this.V_tableService.S_getFieldsByTable(this.selectedTable.id).subscribe(fields => {
      this.fields = fields;
      this.selectedField = null;
    });
  }

  TS_onFieldSelected(): void {
    if (this.selectedField && this.selectedTable) {
      this.V_tableService.S_getDataForField(this.selectedTable.id, this.selectedField.id).subscribe(data => {
        console.log('Raw data:', data); // Continue logging raw data for verification

        const listValues = data.map(d => d.details && d.details[this.selectedField.name]); // Use the selected field's name dynamically
        console.log('Mapped listValues:', listValues); // Log the mapped values to check

        this.lastSelectedListValues = listValues;
        this.listValuesUpdated.emit(listValues);
        if (this.selectedField.type === 'List') {
          this.TS_loadRelatedFields(this.selectedField.id); // Load related fields if the field type is List
        }
      });
    }
  }
  TS_loadRelatedFields(fieldId: number): void {
    // Implement service method to fetch related fields based on list field ID
    this.V_tableService.S_getRelatedFieldsByListFieldId(fieldId).subscribe(relatedFields => {
      this.relatedFields = relatedFields;
    });
  }
  TS_closeDialog(): void {
    this.dialogRef.close(this.lastSelectedListValues); // Pass the latest list values as the result of the dialog
  }

}
