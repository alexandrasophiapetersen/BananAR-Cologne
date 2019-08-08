import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDetailPage } from './json-detail.page';

describe('JsonDetailPage', () => {
  let component: JsonDetailPage;
  let fixture: ComponentFixture<JsonDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
