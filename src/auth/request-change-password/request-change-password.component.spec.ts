import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestChangePasswordComponent } from './request-change-password.component';

describe('RequestChangePasswordComponent', () => {
  let component: RequestChangePasswordComponent;
  let fixture: ComponentFixture<RequestChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
