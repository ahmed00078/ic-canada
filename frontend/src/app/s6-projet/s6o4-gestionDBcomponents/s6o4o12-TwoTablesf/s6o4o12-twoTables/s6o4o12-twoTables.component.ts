import { Component, Input, OnInit } from '@angular/core';
import { S_TableService } from '../../../services/TableService/Table.service';

@Component({
  selector: 'app-s6o4o12-twoTables',
  templateUrl: './s6o4o12-twoTables.component.html',
  styleUrls: ['./s6o4o12-twoTables.component.css'],
})
export class S6o4o12TwoTablesComponent implements OnInit {
  tables: any[] = [];
  fields: any[] = [];
  fieldsByTableId: { [tableId: string]: any[] } = {};
  offsetX: number = 0;
  offsetY: number = 0;
  selectedFieldsByTableId: { [tableId: string]: { id: string; name: string; data: any[] }[] } = {};
  selectedTableName: string | null = null;
  @Input() selectedTables: any[] = [];

  constructor(private V_tableService: S_TableService) {}

  ngOnInit() {
    this.TS_loadAllTables();
  }

  TS_loadAllTables(): void {
    this.V_tableService.S_getAllTables().subscribe((tables) => {
      this.tables = tables;
    });
  }

  TS_selectTable(table: any): void {
    const index = this.selectedTables.findIndex((t) => t.id === table.id);
    if (index > -1) {
      this.selectedTables.splice(index, 1); // Remove table from selection
      delete this.selectedFieldsByTableId[table.id]; // Cleanup on deselect
      this.selectedTableName = null; // Reset selected table name
    } else {
      this.selectedTables.push(table); // Add table to selection
      this.selectedTableName = table.name; // Store the selected table name
      this.TS_loadFieldsForTable(table.id);
    }
  }

  TS_loadFieldsForTable(tableId: string): void {
    this.V_tableService.S_getFieldsByTable(parseInt(tableId, 10)).subscribe((fields) => {
      this.fieldsByTableId[tableId] = fields;
  });

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
    console.log('Loading data for table ID:', tableId);

  }

  TS_getSelectedFieldsData(tableId: string, data: any[]): any[] {
    const selectedFields = this.fieldsByTableId[tableId];
    if (!selectedFields) {
      console.error('No selected fields available for tableId:', tableId);
      return []; // Return an empty array to prevent runtime errors
    }
    return selectedFields.map((field) => ({
      id: field.id,
      name: field.name,
      data: data.map((item) => item.details && item.details[field.name] ? item.details[field.name] : 'N/A'),
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
  TS_toggleFieldSelection(event: Event, field: any, table: any): void {
    event.stopPropagation();
    const selectedFields = this.selectedFieldsByTableId[table.id] || [];
    const fieldIndex = selectedFields.findIndex((f) => f.id === field.id);

    if (fieldIndex > -1) {
        selectedFields.splice(fieldIndex, 1);
    } else {
        selectedFields.push({ id: field.id, name: field.name, data: [] });
        this.TS_fetchFieldData(table.id, field.id);
    }
    this.selectedFieldsByTableId[table.id] = [...selectedFields];
}


TS_fetchFieldData(tableId: string, fieldId: string): void {
    this.V_tableService.S_getDataForField(parseInt(tableId, 10), parseInt(fieldId, 10)).subscribe(data => {
      const field = this.selectedFieldsByTableId[parseInt(tableId, 10)].find(f => f.id === fieldId);
      if (field) {
        field.data = data;
      }
    });



  }


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
