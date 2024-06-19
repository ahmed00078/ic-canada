import { Component, OnInit } from '@angular/core';
import { S_CategoryService } from '../../services/categService/Category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-s6o4o9-allCategories',
  templateUrl: './s6o4o9-allCategories.component.html',
  styleUrls: ['./s6o4o9-allCategories.component.css']
})
export class S6o4o9AllCategoriesComponent implements OnInit {
  showGestionControls: boolean = false;
  showCreateForm: boolean = false;
  offsetX: number = 0;
  offsetY: number = 0;
  categories: any[] = [];
  selectedCategory: any;
  showS6o4o3allTables: boolean = false;
  categoryForm: FormGroup;
  isEditing: boolean = false;
  editingCategoryId: number | null = null;

  constructor(private V_categoryService: S_CategoryService, private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      parent: [null]
    });
  }

  ngOnInit() {
    this.TS_loadCategories();
  }

  TS_loadCategories(): void {
    this.V_categoryService.S_getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  TS_selectCategory(category: any): void {
    this.selectedCategory = category;
    this.showS6o4o3allTables = true; // Show the allTables component
  }

  TS_createCategory(): void {
    const categoryData = this.categoryForm.value;
    if (!categoryData.parent) {
      delete categoryData.parent;
    }

    this.V_categoryService.S_createCategory(categoryData).subscribe(() => {
      this.TS_loadCategories();
      this.categoryForm.reset({ name: '', parent: null });
    });
  }

  TS_editCategory(categoryId: number, categoryName: string): void {
    this.isEditing = true;
    this.editingCategoryId = categoryId;
    this.categoryForm.patchValue({ name: categoryName, parent: this.selectedCategory.parent ? this.selectedCategory.parent.id : null });
    this.showGestionControls = true;
  }

  TS_updateCategory(): void {
    if (this.categoryForm.valid && this.editingCategoryId !== null) {
      const categoryData = this.categoryForm.value;
      this.V_categoryService.S_updateCategory(this.editingCategoryId, categoryData).subscribe(() => {
        this.TS_loadCategories();
        this.TS_resetForm();
        this.showGestionControls = false; // Hide gestion controls after editing
      });
    }
  }

  TS_deleteCategory(event: MouseEvent, categoryId: number): void {
    event.stopPropagation();

    this.V_categoryService.S_deleteCategory(categoryId).subscribe(() => {
      this.TS_loadCategories();
      this.TS_resetForm();
    });
  }

  TS_resetForm(): void {
    this.categoryForm.reset();
    this.isEditing = false;
    this.editingCategoryId = null;
  }

  TS_handleGestion(): void {
    this.showGestionControls = !this.showGestionControls;
    this.showCreateForm = false;
    if (!this.showGestionControls) {
      this.isEditing = false;
    }
  }

  TS_toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  TS_cancelEdit(): void {
    this.TS_resetForm();
    this.showGestionControls = false;
    this.showCreateForm = false;
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

  submitForm(): void {
    if (this.isEditing) {
      this.TS_updateCategory();
    } else {
      this.TS_createCategory();
    }
  }
}
