import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileAdminPage } from './profile-admin.page';

describe('ProfileAdminPage', () => {
  let component: ProfileAdminPage;
  let fixture: ComponentFixture<ProfileAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
