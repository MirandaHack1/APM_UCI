import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRolPage } from './edit-rol.page';

describe('EditRolPage', () => {
  let component: EditRolPage;
  let fixture: ComponentFixture<EditRolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
