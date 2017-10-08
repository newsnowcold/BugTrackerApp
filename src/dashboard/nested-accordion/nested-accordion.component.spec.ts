import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedAccordionComponent } from './nested-accordion.component';

describe('NestedAccordionComponent', () => {
  let component: NestedAccordionComponent;
  let fixture: ComponentFixture<NestedAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
