import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTeamplayerPage } from './edit-teamplayer.page';

describe('EditTeamplayerPage', () => {
  let component: EditTeamplayerPage;
  let fixture: ComponentFixture<EditTeamplayerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamplayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
