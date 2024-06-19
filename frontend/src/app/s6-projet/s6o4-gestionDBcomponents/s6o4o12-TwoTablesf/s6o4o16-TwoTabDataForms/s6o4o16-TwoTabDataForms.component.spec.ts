/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { S6o4o16TwoTabDataFormsComponent } from './s6o4o16-TwoTabDataForms.component';

describe('S6o4o16TwoTabDataFormsComponent', () => {
  let component: S6o4o16TwoTabDataFormsComponent;
  let fixture: ComponentFixture<S6o4o16TwoTabDataFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S6o4o16TwoTabDataFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o4o16TwoTabDataFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
