import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CredentialsInfoPage } from './credentials-info.page';

describe('CredentialsInfoPage', () => {
  let component: CredentialsInfoPage;
  let fixture: ComponentFixture<CredentialsInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
