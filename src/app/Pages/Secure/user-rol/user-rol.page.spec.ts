import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRolPage } from './user-rol.page';

describe('UserRolPage', () => {
  let component: UserRolPage;
  let fixture: ComponentFixture<UserRolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
