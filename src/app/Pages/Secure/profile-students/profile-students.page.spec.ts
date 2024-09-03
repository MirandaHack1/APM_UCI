import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileStudentsPage } from './profile-students.page';

describe('ProfileStudentsPage', () => {
  let component: ProfileStudentsPage;
  let fixture: ComponentFixture<ProfileStudentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
