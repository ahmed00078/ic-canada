/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { S6o4o11FromOurDBComponent } from './s6o4o11-fromOurDB.component';

describe('S6o4o11FromOurDBComponent', () => {
  let component: S6o4o11FromOurDBComponent;
  let fixture: ComponentFixture<S6o4o11FromOurDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S6o4o11FromOurDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o4o11FromOurDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
