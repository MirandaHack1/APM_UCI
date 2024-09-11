import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCourtPage } from './edit-court.page';

describe('EditCourtPage', () => {
  let component: EditCourtPage;
  let fixture: ComponentFixture<EditCourtPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
