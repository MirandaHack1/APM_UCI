import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditHeadquartersPage } from './edit-headquarters.page';

describe('EditHeadquartersPage', () => {
  let component: EditHeadquartersPage;
  let fixture: ComponentFixture<EditHeadquartersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHeadquartersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
