/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { S6o4o7DataTabComponent } from './s6o4o7-dataTab.component';
import { HttpClientModule } from '@angular/common/http';
import { S_TableService } from '../../services/TableService/Table.service';

describe('S6o4o7DataTabComponent', () => {
  let component: S6o4o7DataTabComponent;
  let fixture: ComponentFixture<S6o4o7DataTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S6o4o7DataTabComponent ],
      imports: [HttpClientModule], // Ensure HttpClientModule is imported
      providers: [S_TableService] // Ensure S_TableService is provided
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o4o7DataTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
