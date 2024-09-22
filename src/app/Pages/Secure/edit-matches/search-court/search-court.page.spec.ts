import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCourtPage } from './search-court.page';

describe('SearchCourtPage', () => {
  let component: SearchCourtPage;
  let fixture: ComponentFixture<SearchCourtPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCourtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
