import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoMatchesGeneralPage } from './info-matches-general.page';

describe('InfoMatchesGeneralPage', () => {
  let component: InfoMatchesGeneralPage;
  let fixture: ComponentFixture<InfoMatchesGeneralPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMatchesGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
