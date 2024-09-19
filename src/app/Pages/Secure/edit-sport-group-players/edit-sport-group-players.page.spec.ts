import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSportGroupPlayersPage } from './edit-sport-group-players.page';

describe('EditSportGroupPlayersPage', () => {
  let component: EditSportGroupPlayersPage;
  let fixture: ComponentFixture<EditSportGroupPlayersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSportGroupPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
