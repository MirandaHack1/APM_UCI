import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSportsGroupsDosPage } from './search-sports-groups-dos.page';

describe('SearchSportsGroupsDosPage', () => {
  let component: SearchSportsGroupsDosPage;
  let fixture: ComponentFixture<SearchSportsGroupsDosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSportsGroupsDosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
