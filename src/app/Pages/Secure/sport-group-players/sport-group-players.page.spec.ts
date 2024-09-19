import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SportGroupPlayersPage } from './sport-group-players.page';

describe('SportGroupPlayersPage', () => {
  let component: SportGroupPlayersPage;
  let fixture: ComponentFixture<SportGroupPlayersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SportGroupPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
