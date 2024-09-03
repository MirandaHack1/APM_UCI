import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessInformationPage } from './business-information.page';

describe('BusinessInformationPage', () => {
  let component: BusinessInformationPage;
  let fixture: ComponentFixture<BusinessInformationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
