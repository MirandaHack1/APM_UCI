import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGroupStagePage } from './edit-group-stage.page';

describe('EditGroupStagePage', () => {
  let component: EditGroupStagePage;
  let fixture: ComponentFixture<EditGroupStagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupStagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
