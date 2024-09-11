import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCredentialsInfoPage } from './edit-credentials-info.page';

describe('EditCredentialsInfoPage', () => {
  let component: EditCredentialsInfoPage;
  let fixture: ComponentFixture<EditCredentialsInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCredentialsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
