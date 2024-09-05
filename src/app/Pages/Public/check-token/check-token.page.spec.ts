import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckTokenPage } from './check-token.page';

describe('CheckTokenPage', () => {
  let component: CheckTokenPage;
  let fixture: ComponentFixture<CheckTokenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
