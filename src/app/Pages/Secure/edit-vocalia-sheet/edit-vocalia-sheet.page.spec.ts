import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditVocaliaSheetPage } from './edit-vocalia-sheet.page';

describe('EditVocaliaSheetPage', () => {
  let component: EditVocaliaSheetPage;
  let fixture: ComponentFixture<EditVocaliaSheetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVocaliaSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
