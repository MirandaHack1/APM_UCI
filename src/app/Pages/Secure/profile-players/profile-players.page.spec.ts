import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePlayersPage } from './profile-players.page';

describe('ProfilePlayersPage', () => {
  let component: ProfilePlayersPage;
  let fixture: ComponentFixture<ProfilePlayersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
