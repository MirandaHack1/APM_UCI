import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMatchesPage } from './edit-matches.page';

describe('EditMatchesPage', () => {
  let component: EditMatchesPage;
  let fixture: ComponentFixture<EditMatchesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
