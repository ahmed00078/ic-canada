/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { S6o4o3AllTablesComponent } from './s6o4o3-allTables.component';
import { HttpClientModule } from '@angular/common/http';
import { S_TableService } from '../../services/TableService/Table.service';

describe('S6o4o3AllTablesComponent', () => {
  let component: S6o4o3AllTablesComponent;
  let fixture: ComponentFixture<S6o4o3AllTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S6o4o3AllTablesComponent ],
      imports: [HttpClientModule], // Ensure HttpClientModule is imported
      providers: [S_TableService] // Ensure S_TableService is provided
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o4o3AllTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
