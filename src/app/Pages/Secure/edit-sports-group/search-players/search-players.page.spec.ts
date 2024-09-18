import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPlayersPage } from './search-players.page';

describe('SearchPlayersPage', () => {
  let component: SearchPlayersPage;
  let fixture: ComponentFixture<SearchPlayersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
