import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { S_TableService } from 'src/app/s6-projet/services/TableService/Table.service';
import { S_CategoryService } from 'src/app/s6-projet/services/categService/Category.service';

@Component({
  selector: 'app-s6o4o18-CatTable',
  templateUrl: './s6o4o18-CatTable.component.html',
  styleUrls: ['./s6o4o18-CatTable.component.css']
})


export class S6o4o18CatTableComponent implements OnInit {
  cards: { title: string; description: string[]; selectable?: boolean; droppable?: boolean }[] = [
    { title: 'Categories', description: [], selectable: true },
    { title: 'Tables', description: [] },
    { title: 'Rapports', description: ['Visuel 1', 'Visuel 2'] },
    { title: 'Selected', description: [], droppable: true }
  ];
  @Output() selectedTablesChange = new EventEmitter<any[]>();

  constructor(private cdr: ChangeDetectorRef,private V_categoryService: S_CategoryService, private V_tableService: S_TableService) { }

  ngOnInit() {
    this.TS_loadCategories();
  }

  TS_loadCategories(): void {
    this.V_categoryService.S_getAllCategories().subscribe(categories => {
      this.cards[0].description = categories.map(cat => cat.name);
    });
  }

  TS_onCategorySelect(categoryName: string): void {
    this.V_categoryService.S_getAllCategories().subscribe(categories => {
      const selectedCategory = categories.find(cat => cat.name === categoryName);
      if (selectedCategory) {
        this.V_tableService.S_getTablesByCategoryId(selectedCategory.id).subscribe(tables => {
          this.cards[1].description = tables.map(table => table.name);
        });
      }
    });
  }

  TS_unselectTable(tableName: string, event: MouseEvent): void {
    event.stopPropagation(); // Prevent triggering any other click events
    const index = this.cards[3].description.indexOf(tableName);
    if (index > -1) {
      this.cards[3].description.splice(index, 1); // Remove the table from the list
      this.selectedTablesChange.emit(this.cards[3].description); // Update the parent component
    }
  }


  TS_toggleTableSelection(tableName: string): void {
    if (this.cards[3].title === 'Selected') {
      const selectedTablesIndex = this.cards[3].description.indexOf(tableName);
      if (selectedTablesIndex !== -1) {
        // Table is already selected, so unselect it
        this.cards[3].description.splice(selectedTablesIndex, 1);
      } else {
        // Table is not selected, so select it
        this.cards[3].description.push(tableName);
      }

    }      this.selectedTablesChange.emit(this.cards[3].description); // Emit the list of table names

  }

  TS_allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  TS_onDrop(event: DragEvent, card: any): void {
    event.preventDefault();
    if (event.dataTransfer && card.droppable) {
      const data = event.dataTransfer.getData("text");
      if (card.title === 'Selected') {
        card.description.push(data);
        this.selectedTablesChange.emit(this.cards[3].description);
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    }
  }

  TS_onDragStart(event: DragEvent, tableName: string): void {
    event.dataTransfer?.setData('text/plain', tableName);
  }
}
