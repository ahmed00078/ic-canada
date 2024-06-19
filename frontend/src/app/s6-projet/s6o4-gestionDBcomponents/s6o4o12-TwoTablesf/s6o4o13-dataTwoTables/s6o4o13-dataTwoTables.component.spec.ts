/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { S6o4o13DataTwoTablesComponent } from './s6o4o13-dataTwoTables.component';

describe('S6o4o13DataTwoTablesComponent', () => {
  let component: S6o4o13DataTwoTablesComponent;
  let fixture: ComponentFixture<S6o4o13DataTwoTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S6o4o13DataTwoTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o4o13DataTwoTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
