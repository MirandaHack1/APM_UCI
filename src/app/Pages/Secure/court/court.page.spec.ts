import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourtPage } from './court.page';

describe('CourtPage', () => {
  let component: CourtPage;
  let fixture: ComponentFixture<CourtPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
