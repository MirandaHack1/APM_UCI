import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUserRolPage } from './edit-user-rol.page';

describe('EditUserRolPage', () => {
  let component: EditUserRolPage;
  let fixture: ComponentFixture<EditUserRolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserRolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
