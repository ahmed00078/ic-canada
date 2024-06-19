import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { S_TableService } from '../../services/TableService/Table.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S_CategoryService } from '../../services/categService/Category.service';

@Component({
  selector: 'app-s6o4o3-allTables',
  templateUrl: './s6o4o3-allTables.component.html',
  styleUrls: ['./s6o4o3-allTables.component.css']
})
export class S6o4o3AllTablesComponent implements OnInit {
  @Input() selectedCategory: any;
  offsetX: number = 0;
  offsetY: number = 0;
  tables: any[] = [];
  showS6o4o6Tab: boolean = false;
  selectedTable: any = null;
  fields: any[] = [];
  tableForm: FormGroup;
  isEditing: boolean = false;
  editingTableId: number | null = null;
  errorMessage: string | null = null;
  categories: any[] = [];
  showManagementButtons: boolean = false;
  showCreateForm = false;

  constructor(private V_tableService: S_TableService, private V_categoryService: S_CategoryService, private formBuilder: FormBuilder) {
    this.tableForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.TS_LoadCategories();
    if (this.selectedCategory) {
      this.TS_LoadTablesByCategory(this.selectedCategory.id);
      this.tableForm.controls['category'].setValue(this.selectedCategory.id);
    }
  }
  TS_LoadCategories(): void {
    this.V_categoryService.S_getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  TS_LoadTablesByCategory(categoryId: number): void {
    this.V_tableService.S_getTablesByCategoryId(categoryId).subscribe(tables => {
      this.tables = tables;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory'] && changes['selectedCategory'].currentValue) {
      this.TS_LoadTablesByCategory(this.selectedCategory.id);
    }
  }

  TS_DragStart(event: DragEvent): void {
    const target = event.target as HTMLElement | null;
    if (target) {
      const rect = target.getBoundingClientRect();
      this.offsetX = event.clientX - rect.left;
      this.offsetY = event.clientY - rect.top;
    }
    event.dataTransfer?.setDragImage(new Image(), 0, 0);
  }

  TS_DragEnd(event: DragEvent): void {
    const target = event.target as HTMLElement | null;
    if (target) {
      const x = event.clientX - this.offsetX;
      const y = event.clientY - this.offsetY;
      target.style.position = 'absolute';
      target.style.left = `${x}px`;
      target.style.top = `${y}px`;
    }
  }

  TS_SelectTable(table: any): void {
    this.selectedTable = table;
    this.V_tableService.S_getFieldsByTable(table.id).subscribe(fields => {
      this.fields = fields;
    });
    this.TS_ToggleS6o4o6Tab();
  }
  TS_ToggleS6o4o6Tab(): void {
    if (this.selectedTable) {
      this.showS6o4o6Tab = !this.showS6o4o6Tab;
    }
  }
  
  TS_EditTable(tableId: number, tableName: string): void {
    this.isEditing = true;
    this.editingTableId = tableId;
    this.tableForm.setValue({ name: tableName, category: this.selectedCategory.id });
    this.showCreateForm = true;  // Show the form for editing
  }

  TS_DeleteTable(tableId: number): void {
    this.V_tableService.S_deleteTable(tableId).subscribe({
      next: () => {
        // After successful deletion, load tables from the currently selected category
        if (this.selectedCategory && this.selectedCategory.id) {
          this.TS_LoadTablesByCategory(this.selectedCategory.id);
        } else {
          // Fallback to load all tables or handle according to your app's needs
          this.TS_LoadTables();
        }
      },
      error: (error) => {
        // Handle any errors, such as showing a message to the user
        this.errorMessage = error.error.message;
      }
    });
  }

  TS_ToggleManagementButtons() {
    this.showManagementButtons = !this.showManagementButtons;
    if (!this.showManagementButtons) {
      this.isEditing = false;
      this.showCreateForm = false;
    }
  }

  TS_CancelEdit() {
    this.isEditing = false;
    this.showCreateForm = false;
    this.tableForm.reset();
  }

  TS_SubmitForm(): void {
    if (this.isEditing) {
      this.TS_UpdateTable();  // Call update if editingTableId is set
    } else {
      this.TS_CreateTable();  // Call create if no editingTableId is set
    }
  }
  TS_CreateTable(): void {
    if (this.tableForm.valid) {
      const tableData = { ...this.tableForm.value, category: this.selectedCategory.id };
      this.V_tableService.S_createTable(tableData).subscribe({
        next: () => {
          this.TS_LoadTablesByCategory(this.selectedCategory.id);
          this.tableForm.reset({ name: '', category: this.selectedCategory.id }); // Reset the form but keep the category
        },
        error: (error) => {
          this.errorMessage = error.error.message;  // Handle error
        }
      });
    } else {
      console.log("Form is not valid, cannot create table.");
    }
  }
  TS_LoadTables(): void {
    this.V_tableService.S_getAllTables().subscribe(data => {
      this.tables = data;
    });
  }
  TS_UpdateTable(): void {
    if (this.tableForm.valid && this.editingTableId !== null) {
      const tableData = { ...this.tableForm.value, category: this.selectedCategory.id };
      console.log('Calling update with ID:', this.editingTableId); // Confirm ID and data
      this.V_tableService.S_updateTable(this.editingTableId, tableData).subscribe({
        next: () => {
          this.TS_LoadTablesByCategory(this.selectedCategory.id);
          this.TS_ResetForm();
          this.showCreateForm = false; // Hide the form after editing
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        }
      });
    }
  }
  TS_ResetForm(): void {
    this.tableForm.reset({
      name: '',          // Reset the 'name' control to empty
      category: this.selectedCategory ? this.selectedCategory.id : null  // Reset 'category' to current or null
    });
    this.isEditing = false;
    this.editingTableId = null;
    this.errorMessage = null;  // Clear any existing error messages
  }




}
