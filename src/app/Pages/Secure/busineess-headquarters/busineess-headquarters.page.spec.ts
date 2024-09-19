import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusineessHeadquartersPage } from './busineess-headquarters.page';

describe('BusineessHeadquartersPage', () => {
  let component: BusineessHeadquartersPage;
  let fixture: ComponentFixture<BusineessHeadquartersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BusineessHeadquartersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
