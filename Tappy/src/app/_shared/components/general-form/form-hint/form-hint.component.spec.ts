import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHintComponent } from './form-hint.component';

describe('FormHintComponent', () => {
  let component: FormHintComponent;
  let fixture: ComponentFixture<FormHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHintComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
