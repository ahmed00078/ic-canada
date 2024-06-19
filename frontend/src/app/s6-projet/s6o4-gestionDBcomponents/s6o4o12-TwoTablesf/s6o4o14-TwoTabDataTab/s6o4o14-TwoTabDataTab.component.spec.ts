/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { S6o4o14TwoTabDataTabComponent } from './s6o4o14-TwoTabDataTab.component';

describe('S6o4o14TwoTabDataTabComponent', () => {
  let component: S6o4o14TwoTabDataTabComponent;
  let fixture: ComponentFixture<S6o4o14TwoTabDataTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S6o4o14TwoTabDataTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o4o14TwoTabDataTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
