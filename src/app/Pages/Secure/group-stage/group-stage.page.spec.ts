import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupStagePage } from './group-stage.page';

describe('GroupStagePage', () => {
  let component: GroupStagePage;
  let fixture: ComponentFixture<GroupStagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupStagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
