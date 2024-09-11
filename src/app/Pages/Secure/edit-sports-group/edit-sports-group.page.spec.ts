import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSportsGroupPage } from './edit-sports-group.page';

describe('EditSportsGroupPage', () => {
  let component: EditSportsGroupPage;
  let fixture: ComponentFixture<EditSportsGroupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSportsGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
