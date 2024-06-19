import { Component, Input, OnInit } from '@angular/core';
import { S_TableService } from 'src/app/s6-projet/services/TableService/Table.service';

@Component({
  selector: 'app-s6o4o17-TwoTabDataFormsLie',
  templateUrl: './s6o4o17-TwoTabDataFormsLie.component.html',
  styleUrls: ['./s6o4o17-TwoTabDataFormsLie.component.css']
})
export class S6o4o17TwoTabDataFormsLieComponent implements OnInit {

  @Input() selectedTable: any;
  @Input() selectedFieldsByTableId: { [tableId: string]: { id: string; name: string; data: any[] }[] } = {};

    tables: any[] = [];
    selectedTables: any[] = [];
    fields: any[] = [];
    fieldsByTableId: { [tableId: string]: any[] } = {};
    offsetX: number = 0;
    offsetY: number = 0;



    constructor(private V_tableService:S_TableService) {}

  ngOnInit() {
    console.log('Received selectedFieldsByTableId:', this.selectedFieldsByTableId);

  }
  TS_objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  TS_loadAllTables(): void {
    this.V_tableService.S_getAllTables().subscribe((tables) => {
      this.tables = tables;
      // Load data for selected tables
      this.tables.forEach((table) => {
        if (this.selectedTables.some((t) => t.id === table.id)) {
          this.TS_loadData(table.id);
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

  TS_loadData(tableId: any): void {
    this.V_tableService.S_getDataByTable(tableId).subscribe((data) => {
      // Assuming you have a method to determine selected fields and their data
      const selectedFieldsData = this.TS_getSelectedFieldsData(tableId, data);
      this.selectedFieldsByTableId[tableId] = selectedFieldsData;
      console.log(
        'Loaded data for table with ID',
        tableId,
        ':',
        selectedFieldsData
      );
    });
  }

  TS_getSelectedFieldsData(tableId: string, data: any[]): any[] {
    const selectedFields = this.fieldsByTableId[tableId];
    // Assuming selected fields are determined based on some logic
    return selectedFields.map((field) => ({
      id: field.id,
      name: field.name,
      data: data.map((item) => item[field.name]), // Assuming field name matches data property
    }));
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
