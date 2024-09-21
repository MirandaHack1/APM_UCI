import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchGroupPlayersPage } from './search-group-players.page';

describe('SearchGroupPlayersPage', () => {
  let component: SearchGroupPlayersPage;
  let fixture: ComponentFixture<SearchGroupPlayersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGroupPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
