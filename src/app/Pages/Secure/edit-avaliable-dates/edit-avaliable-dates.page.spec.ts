import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAvaliableDatesPage } from './edit-avaliable-dates.page';

describe('EditAvaliableDatesPage', () => {
  let component: EditAvaliableDatesPage;
  let fixture: ComponentFixture<EditAvaliableDatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAvaliableDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
