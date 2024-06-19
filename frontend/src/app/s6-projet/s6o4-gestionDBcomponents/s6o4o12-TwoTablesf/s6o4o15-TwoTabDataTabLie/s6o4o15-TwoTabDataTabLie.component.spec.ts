/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { S6o4o15TwoTabDataTabLieComponent } from './s6o4o15-TwoTabDataTabLie.component';

describe('S6o4o15TwoTabDataTabLieComponent', () => {
  let component: S6o4o15TwoTabDataTabLieComponent;
  let fixture: ComponentFixture<S6o4o15TwoTabDataTabLieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S6o4o15TwoTabDataTabLieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o4o15TwoTabDataTabLieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
