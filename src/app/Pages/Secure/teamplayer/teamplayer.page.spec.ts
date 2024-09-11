import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamplayerPage } from './teamplayer.page';

describe('TeamplayerPage', () => {
  let component: TeamplayerPage;
  let fixture: ComponentFixture<TeamplayerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamplayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
