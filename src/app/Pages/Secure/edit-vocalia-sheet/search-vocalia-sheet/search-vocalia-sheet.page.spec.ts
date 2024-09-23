import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchVocaliaSheetPage } from './search-vocalia-sheet.page';

describe('SearchVocaliaSheetPage', () => {
  let component: SearchVocaliaSheetPage;
  let fixture: ComponentFixture<SearchVocaliaSheetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVocaliaSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
