import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoClientPage } from './info-client.page';

describe('InfoClientPage', () => {
  let component: InfoClientPage;
  let fixture: ComponentFixture<InfoClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
