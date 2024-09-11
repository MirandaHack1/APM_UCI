import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SportsGroupPage } from './sports-group.page';

describe('SportsGroupPage', () => {
  let component: SportsGroupPage;
  let fixture: ComponentFixture<SportsGroupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
