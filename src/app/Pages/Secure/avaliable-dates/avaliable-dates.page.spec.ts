import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliableDatesPage } from './avaliable-dates.page';

describe('AvaliableDatesPage', () => {
  let component: AvaliableDatesPage;
  let fixture: ComponentFixture<AvaliableDatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliableDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
