import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchGroupsPage } from './search-groups.page';

describe('SearchGroupsPage', () => {
  let component: SearchGroupsPage;
  let fixture: ComponentFixture<SearchGroupsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
