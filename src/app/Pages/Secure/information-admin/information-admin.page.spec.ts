import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationAdminPage } from './information-admin.page';

describe('InformationAdminPage', () => {
  let component: InformationAdminPage;
  let fixture: ComponentFixture<InformationAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
