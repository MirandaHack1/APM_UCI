import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBusinessInformationPage } from './edit-business-information.page';

describe('EditBusinessInformationPage', () => {
  let component: EditBusinessInformationPage;
  let fixture: ComponentFixture<EditBusinessInformationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusinessInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
