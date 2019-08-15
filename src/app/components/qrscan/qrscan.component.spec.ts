import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrscanComponent } from './qrscan.component';

describe('QrscanComponent', () => {
  let component: QrscanComponent;
  let fixture: ComponentFixture<QrscanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QrscanComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
