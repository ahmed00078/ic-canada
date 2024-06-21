/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { S6o4o9AllCategoriesComponent } from './s6o4o9-allCategories.component';
import { HttpClientModule } from '@angular/common/http';
import { S_CategoryService } from '../../services/categService/Category.service';

describe('S6o4o9AllCategoriesComponent', () => {
  let component: S6o4o9AllCategoriesComponent;
  let fixture: ComponentFixture<S6o4o9AllCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S6o4o9AllCategoriesComponent ],
      imports: [HttpClientModule], // Ensure HttpClientModule is imported
      providers: [S_CategoryService] // Ensure S_CategoryService is provided
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o4o9AllCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
