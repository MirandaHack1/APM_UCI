import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCordinatorPage } from './profile-cordinator.page';

describe('ProfileCordinatorPage', () => {
  let component: ProfileCordinatorPage;
  let fixture: ComponentFixture<ProfileCordinatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCordinatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
