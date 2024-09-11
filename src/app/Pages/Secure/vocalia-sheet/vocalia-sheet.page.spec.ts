import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VocaliaSheetPage } from './vocalia-sheet.page';

describe('VocaliaSheetPage', () => {
  let component: VocaliaSheetPage;
  let fixture: ComponentFixture<VocaliaSheetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VocaliaSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
