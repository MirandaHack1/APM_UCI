import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoMatchesDetailPage } from './info-matches-detail.page';

describe('InfoMatchesDetailPage', () => {
  let component: InfoMatchesDetailPage;
  let fixture: ComponentFixture<InfoMatchesDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMatchesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
