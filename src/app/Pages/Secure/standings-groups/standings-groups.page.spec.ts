import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandingsGroupsPage } from './standings-groups.page';

describe('StandingsGroupsPage', () => {
  let component: StandingsGroupsPage;
  let fixture: ComponentFixture<StandingsGroupsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
