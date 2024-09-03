import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationPlayersPage } from './information-players.page';

describe('InformationPlayersPage', () => {
  let component: InformationPlayersPage;
  let fixture: ComponentFixture<InformationPlayersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
