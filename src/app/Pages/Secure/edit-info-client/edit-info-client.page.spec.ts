import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditInfoClientPage } from './edit-info-client.page';

describe('EditInfoClientPage', () => {
  let component: EditInfoClientPage;
  let fixture: ComponentFixture<EditInfoClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
