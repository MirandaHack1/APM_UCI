import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGroupsPage } from './edit-groups.page';

describe('EditGroupsPage', () => {
  let component: EditGroupsPage;
  let fixture: ComponentFixture<EditGroupsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
