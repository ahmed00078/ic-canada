import { Component, Input, OnInit } from '@angular/core';
import { S_TableService } from 'src/app/s6-projet/services/TableService/Table.service';

@Component({
  selector: 'app-s6o4o16-TwoTabDataForms',
  templateUrl: './s6o4o16-TwoTabDataForms.component.html',
  styleUrls: ['./s6o4o16-TwoTabDataForms.component.css']
})
export class S6o4o16TwoTabDataFormsComponent implements OnInit {
  @Input() selectedTable: any;
  @Input() selectedFieldsByTableId: { [tableId: string]: { id: string; name: string; data: any[] }[] } = {};

    tables: any[] = [];
    selectedTables: any[] = [];
    fields: any[] = [];
    fieldsByTableId: { [tableId: string]: any[] } = {};
    currentPage: number = 1;
    pageSize: number = 1;
    totalPages: number = 1;
    constructor(private V_tableService: S_TableService) {}

  ngOnInit() {
    console.log('Received selectedFieldsByTableId:', this.selectedFieldsByTableId);

  }

  TS_objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  TS_loadAllTables(): void {
    this.V_tableService.S_getAllTables().subscribe((tables) => {
      this.tables = tables;
      this.tables.forEach((table) => {
        const numericTableId = parseInt(table.id, 10);  // Convert string to integer
        if (this.selectedTables.some((t) => parseInt(t.id, 10) === numericTableId)) {
          this.TS_loadData(table.id);  // Pass the string version if your internal method needs it
        }
      });
    });
  }

  TS_selectTable(table: any): void {
    const index = this.selectedTables.findIndex((t) => t.id === table.id);
    if (index > -1) {
      this.selectedTables.splice(index, 1); // Remove table from selection
      delete this.fieldsByTableId[table.id]; // Remove fields for this table
      delete this.selectedFieldsByTableId[table.id]; // Remove selected fields for this table
    } else {
      this.selectedTables.push(table); // Add table to selection
      this.TS_loadData(table.id); // Load data for the selected table
      this.V_tableService.S_getFieldsByTable(table.id).subscribe((fields) => {
        this.fieldsByTableId[table.id] = fields; // Store fields by table ID
      });
    }
  }

  TS_loadData(tableId: string): void {
    const numericTableId = parseInt(tableId, 10); // Assuming IDs need to be numeric
    this.V_tableService.S_getDataByTable(numericTableId).subscribe((data) => {
      const selectedFieldsData = this.TS_getSelectedFieldsData(tableId, data);
      this.selectedFieldsByTableId[tableId] = selectedFieldsData;
      this.TS_updateTotalPages(tableId); // Update total pages based on the loaded data
      console.log('Loaded data for table with ID', tableId, ':', selectedFieldsData);
    });
  }



  TS_getSelectedFieldsData(tableId: string, data: any[]): any[] {
    const selectedFields = this.fieldsByTableId[tableId];
    return selectedFields.map((field) => ({
      id: field.id,
      name: field.name,
      data: data.map((item) => item[field.name]),
    }));
  }

  TS_currentDataForField(tableId: string, fieldId: string): any[] {
    const fieldData = this.selectedFieldsByTableId[tableId].find(f => f.id === fieldId)?.data;
    if (!fieldData) return []; // Return empty if no data
    const pageIndex = (this.currentPage - 1) * this.pageSize;
    return [fieldData[pageIndex]]; // Return only the current data item in a new array
  }

  TS_updateTotalPages(tableId: string): void {
    const maxDataLength = Math.max(...this.selectedFieldsByTableId[tableId].map(field => field.data.length));
    this.totalPages = Math.ceil(maxDataLength / this.pageSize);
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

  TS_selectField(event: MouseEvent, field: any, table: any): void {
    event.stopPropagation(); // Prevent click event from bubbling up to the parent
  }

  TS_isFieldSelected(field: any, table: any): boolean {
    return (
      this.selectedFieldsByTableId[table.id]?.some((f) => f.id === field.id) ??
      false
    );
  }
}
