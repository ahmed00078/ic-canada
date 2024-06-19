import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-s6o4o13-dataTwoTables',
  templateUrl: './s6o4o13-dataTwoTables.component.html',
  styleUrls: ['./s6o4o13-dataTwoTables.component.css']
})
export class S6o4o13DataTwoTablesComponent {
  selectedButton: string | null = null;
  activeComponent: string | null = null;
  isFormMode: boolean = false; // New property to track form mode
  @Input() selectedFieldsByTableId: { [tableId: string]: { id: string; name: string; data: any[] }[] } = {};
  @Input() selectedTableName: string | null = null;

  constructor() { }



  TS_selectButton(buttonName: string): void {
    this.selectedButton = buttonName;
    this.TS_updateActiveComponent();
  }

  TS_toggleForm(): void {
    this.isFormMode = !this.isFormMode;
    this.TS_updateActiveComponent();
  }

  TS_updateActiveComponent(): void {
    if (this.isFormMode) {
      this.activeComponent = this.selectedButton === 'Data-Tab' ? 'Data-Forms' : 'Data-Forms Lié';
    } else {
      this.activeComponent = this.selectedButton;
    }
  }

  TS_isTabSelected(): boolean {
    return this.selectedButton === 'Data-Tab' && !this.isFormMode;
  }

  TS_isTabLieSelected(): boolean {
    return this.selectedButton === 'Data-Tab Lié' && !this.isFormMode;
  }
}
