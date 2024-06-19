import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S_TableService } from '../../services/TableService/Table.service';
import { MatDialog } from '@angular/material/dialog';
import { S6o4o11ListComponent } from '../s6o4o11-listType/s6o4o11-list/s6o4o11-list.component';

@Component({
  selector: 'app-s6o4o6-tab',
  templateUrl: './s6o4o6-tab.component.html',
  styleUrls: ['./s6o4o6-tab.component.css'],
})
export class S6o4o6TabComponent implements OnInit, OnChanges {
  @Input() selectedTable: any;
  showMoreDetails = false;
  showS6o4o7DataTab: boolean = false;
  offsetX: number = 0;
  offsetY: number = 0;
  fieldForm!: FormGroup;
  fields: any[] = [];
  isFieldEditing: boolean = false;
  editingFieldId: number | null = null;
  selectedTableId!: number;
  tables: any[] = [];
  showS6o4o8DataForm: boolean = false;
  activeComponent: string = '';
  showFieldForm: boolean = false;
  showConceptionTools: boolean = false;
  isConceptionToolsActive: boolean = false;
  isDataTabActive: boolean = false;
  isDataFormActive: boolean = false;
  selectedField: any = null;

  fieldTypes = [
    { value: 'TEXT', display: 'Text' },
    { value: 'INTEGER', display: 'Integer' },
    { value: 'DATE', display: 'Date' },
    { value: 'BOOLEAN', display: 'Boolean' },
    { value: 'LIST', display: 'List' },
 

  ];

  constructor(
    private formBuilder: FormBuilder,
    private V_tableService: S_TableService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.TS_initForm();
    if (this.selectedTable) {
      this.TS_loadFields(this.selectedTable.id);
    }
    this.fieldForm.get('field_type')?.valueChanges.subscribe((type) => {
      if (type === 'LIST') {
        const existingListValues = this.isFieldEditing ? this.fieldForm.value.list_values : [];
        this.TS_openListPopUp(existingListValues);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTable'] && this.selectedTable) {
      this.TS_loadFields(this.selectedTable.id);
    }
  }

  TS_openListPopUp(initialList: any[] = []): void {
    const dialogRef = this.dialog.open(S6o4o11ListComponent, {
      width: '400px',
      height:'350px',
      data: { listValues: initialList }
    });

    dialogRef.componentInstance.listValuesUpdated.subscribe((updatedListValues: string[]) => {
      this.fieldForm.patchValue({ list_values: updatedListValues });
    });
  }

  TS_initForm(): void {
    this.fieldForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      field_type: ['', Validators.required],
      tableId: [this.selectedTable?.id, Validators.required],
      list_values: [[]],
      image: [null]
    });
  }

  TS_loadFields(tableId: number): void {
    this.V_tableService.S_getFieldsByTable(tableId).subscribe(
      (data) => {
        this.fields = data;
        this.TS_resetFieldForm();
      },
      (error) => {
        console.error('Error loading fields:', error);
        this.fields = [];
      }
    );
  }

  TS_loadTables(selectedTableId: number | null): void {
    this.V_tableService.S_getAllTables().subscribe((data) => {
      this.tables = data;
      if (this.tables.length > 0) {
        this.selectedTableId =
          selectedTableId !== null ? selectedTableId : this.tables[0].id;
        this.TS_loadFields(this.selectedTableId);
      }
    });
  }

  TS_addField(): void {
    this.TS_resetFieldForm();
    this.isFieldEditing = false;
    this.editingFieldId = 0;
  }

  //CRUD

  TS_createField(): void {
    if (this.fieldForm.valid) {
      const fieldData = this.fieldForm.value;

      fieldData.table = this.selectedTable?.id; // Ensure the table ID is included

      if (this.isFieldEditing && this.editingFieldId != null) {
        this.TS_updateField(this.editingFieldId, fieldData);
      } else {
        this.V_tableService.S_createField(fieldData).subscribe({
          next: () => {
            this.TS_loadFields(this.selectedTable?.id); // Reload fields for the current table
            this.TS_resetFieldForm();
          },
          error: (error) => {
            console.error('Error creating field:', error);
          },
        });
      }
    }
  }

  TS_updateField(fieldId: number, fieldData: any): void {
    const updateDataWithTableId = {
      ...fieldData,
      tableId: this.selectedTable?.id,
    };

    this.V_tableService.S_updateField(fieldId, updateDataWithTableId).subscribe({
      next: () => {
        console.log('Field updated successfully');
        this.TS_loadFields(this.selectedTable?.id);
        this.TS_resetFieldForm();
      },
      error: (error) => {
        console.error('Error updating field:', error);
      },
    });
  }

  TS_editField(fieldId: number, fieldName: string, fieldType: string, listValues: any[] = []): void {
    this.isFieldEditing = true;
    this.editingFieldId = fieldId;
    this.fieldForm.setValue({
        name: fieldName,
        field_type: fieldType,
        tableId: this.selectedTable?.id,
        list_values: listValues || []  // Provide default empty array if listValues is undefined
    });
    this.showFieldForm = true;
}


TS_resetFieldForm(): void {
    this.fieldForm.reset({
      tableId: this.selectedTable?.id,
    });
    this.isFieldEditing = false;
    this.editingFieldId = 0;
  }

  TS_deleteField(fieldId: number): void {
    this.V_tableService.S_deleteField(fieldId).subscribe({
      next: () => {
        this.TS_loadFields(this.selectedTable?.id);
      },
      error: (error) => {
        console.error('Error deleting field:', error);
      },
    });
  }



  //TOGGLE

  TS_toggleDetails() {
    this.showMoreDetails = !this.showMoreDetails;
  }

  TS_toggleDataTab(): void {
    this.isDataTabActive = !this.isDataTabActive;
    this.isDataFormActive = false;
    this.isConceptionToolsActive = false;
    this.activeComponent = this.isDataTabActive ? 'dataTab' : '';
  }

  TS_toggleDataForm(): void {
    this.isDataFormActive = !this.isDataFormActive;
    this.isDataTabActive = false;
    this.isConceptionToolsActive = false;
    this.activeComponent = this.isDataFormActive ? 'dataForm' : '';
  }

  TS_toggleConceptionTools(): void {
    this.showConceptionTools = !this.showConceptionTools;
    this.isConceptionToolsActive = !this.isConceptionToolsActive;
    this.isDataTabActive = false;
    this.isDataFormActive = false;

    // Hide the field form and reset the + icon when conception tools are hidden
    if (!this.showConceptionTools) {
      this.showFieldForm = false;
      this.showSecondImage = false; // Reset the + icon state
      this.TS_resetFieldForm(); // Reset the form
    }
}


  TS_toggleFieldFormVisibility(): void {
    this.showFieldForm = !this.showFieldForm;

    if (this.showFieldForm) {
      this.TS_resetFieldForm();
    }
    this.showSecondImage = !this.showSecondImage;
  }
  showSecondImage = false; // Initially set to false

  //DRAG

  TS_dragStart(event: DragEvent): void {
    const target = event.target as HTMLElement | null;
    if (target) {
      const rect = target.getBoundingClientRect();
      this.offsetX = event.clientX - rect.left;
      this.offsetY = event.clientY - rect.top;
    }
    event.dataTransfer?.setDragImage(new Image(), 0, 0);
  }

  TS_dragEnd(event: DragEvent): void {
    const target = event.target as HTMLElement | null;
    if (target) {
      const x = event.clientX - this.offsetX;
      const y = event.clientY - this.offsetY;
      target.style.position = 'absolute';
      target.style.left = `${x}px`;
      target.style.top = `${y}px`;
    }
  }
}
