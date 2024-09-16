import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRulesPage } from './edit-rules.page';

describe('EditRulesPage', () => {
  let component: EditRulesPage;
  let fixture: ComponentFixture<EditRulesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
