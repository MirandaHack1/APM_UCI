import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSportsGroupsPage } from './search-sports-groups.page';

describe('SearchSportsGroupsPage', () => {
  let component: SearchSportsGroupsPage;
  let fixture: ComponentFixture<SearchSportsGroupsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSportsGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
