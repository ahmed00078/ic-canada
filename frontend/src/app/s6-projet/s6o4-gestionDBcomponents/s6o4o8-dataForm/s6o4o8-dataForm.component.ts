import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S_TableService } from '../../services/TableService/Table.service';

@Component({
  selector: 'app-s6o4o8-dataForm',
  templateUrl: './s6o4o8-dataForm.component.html',
  styleUrls: ['./s6o4o8-dataForm.component.css']
})
export class S6o4o8DataFormComponent implements OnInit {
  @Input() selectedTable: any;
  @Input() fields!: any[];
  currentPageIndex: number = 0;
  dataForm!: FormGroup ;
  dataSets:any[] = [];
  tables: any[] = [];
  formData: any = {};
  selectedTableId: number | null = null;
  currentPage: number = 1;
  pageSize: number = 1;
  totalPages: number = 1;
  currentEditId: number | null = null;

  constructor(private formBuilder: FormBuilder, private V_tableService: S_TableService) {

  }
  ngOnInit(): void {
    this.V_tableService.S_getAllTables().subscribe(tables => {
          this.tables = tables;
        });
        this.V_tableService.selectedTableId$.subscribe(tableId => {
          this.selectedTableId = tableId;
          if (tableId) {
            // If a table is selected, fetch its fields
            this.V_tableService.S_getFieldsByTable(tableId).subscribe(fields => {
              this.fields = fields;
              this.TS_createForm();
            });
          }
        });
        if (this.selectedTable) {
          this.TS_loadData(this.selectedTable.id);
        }
      }

      TS_loadData(tableId: number): void {
        if (tableId) {
          this.V_tableService.S_getFieldsByTable(tableId).subscribe(fields => {
            this.fields = fields;
            this.TS_createForm();
          });
          this.V_tableService.S_getDataByTable(tableId).subscribe(data => {
            this.dataSets = data;
            this.totalPages = Math.ceil(data.length / this.pageSize);
            this.currentPage = 1; // Reset to the first page
          });
        }
      }

      TS_nextPage(): void {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }

      TS_previousPage(): void {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      }

      // Helper method to get the current slice of data for the page
      TS_currentDataSets(): any[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.dataSets.slice(startIndex, startIndex + this.pageSize);
      }


      TS_createForm(): void {
        const formGroupConfig: any = {};
        this.fields.forEach(field => {
          let defaultValue = '';
          switch (field.field_type) {
            case 'LIST':
              defaultValue = field.list_values.length > 0 ? field.list_values[0] : '';
              break;
            case 'IMAGE':
              defaultValue = '';  // Default to empty or a placeholder image URL
              break;
            default:
              defaultValue = '';
          }
          formGroupConfig[field.name] = [defaultValue, Validators.required];
        });
        this.dataForm = this.formBuilder.group(formGroupConfig);
      }


      TS_buildForm(): void {
        const group: any = {};
        this.fields.forEach(field => {
          const fieldValue = this.dataSets[this.currentPageIndex]?.[field.name] || '';
          switch (field.field_type) {
            case 'LIST':
              group[field.name] = [fieldValue || field.list_values[0], Validators.required];
              break;
            case 'IMAGE':
              group[field.name] = [fieldValue, Validators.required];  // Use existing URL or empty
              break;
            default:
              group[field.name] = [fieldValue, Validators.required];
          }
        });
        this.dataForm = this.formBuilder.group(group);
      }


      TS_onSubmit(): void {
        // Ensure a table is selected
        if (!this.selectedTable || !this.dataForm.valid) {
          console.log("No table selected or form is invalid");
          return;
        }

        // Prepare data object to send to server
        const data = {
          table: this.selectedTable.id, // Use selectedTable's id
          details: this.dataForm.value // Use form value to get input data
        };

        // Call the TableService to create data
        this.V_tableService.S_createData(data).subscribe(result => {
          console.log("Data created successfully:", result);

          // Add the newly created data to the dataSets array
          this.dataSets.push(result);

          // Recalculate totalPages
          this.totalPages = Math.ceil(this.dataSets.length / this.pageSize);

          // Optionally, adjust the currentPage to the last page if the new data won't be visible on the current page
          if (this.currentPage < this.totalPages) {
            this.currentPage = this.totalPages;
          }

          this.dataForm.reset();
        }, error => {
          console.error("Error creating data:", error);
        });
      }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields']) {
      this.TS_buildForm();
    }
    if (changes['selectedTable'] && this.selectedTable) {
      this.TS_loadData(this.selectedTable.id);
    }
  }



  TS_getDisplayedFields() {
    return this.fields;
  }

  TS_deleteRow(dataId: number): void {
    // Call the service to delete the data
    this.V_tableService.S_deleteData(dataId).subscribe({
      next: (response) => {
        console.log("Data deleted successfully", response);
        // Remove the deleted row from the dataSets array
        this.dataSets = this.dataSets.filter(dataSet => dataSet.id !== dataId);
        // Recalculate totalPages in case the number of pages changes
        this.totalPages = Math.ceil(this.dataSets.length / this.pageSize);
      },
      error: (error) => console.error("Error deleting data:", error)
    });
  }

  TS_editRow(dataItem: any): void {
    this.currentEditId = dataItem.id; // Set the current editing ID
    this.TS_updateFormData(dataItem); // Populate the form with dataItem's values
  }

  TS_updateFormData(dataItem: any): void {
    this.dataForm.patchValue(dataItem.details); // Assuming 'details' contains the fields' data
  }

  TS_onSubmitEdit(): void {
    if (!this.currentEditId || !this.dataForm.valid) {
        console.log("No item selected for editing or form is invalid");
        return;
    }

    const updatedData = {
        id: this.currentEditId,
        details: this.dataForm.value
    };

    this.V_tableService.S_updateData(this.currentEditId, updatedData).subscribe(result => {
        console.log("Data updated successfully:", result);
        const index = this.dataSets.findIndex(item => item.id === this.currentEditId);
        if (index !== -1) {
            this.dataSets[index].details = result.details;
        }
        this.currentEditId = null;
        this.dataForm.reset();
    }, error => {
        console.error("Error updating data:", error);
    });
}


}
