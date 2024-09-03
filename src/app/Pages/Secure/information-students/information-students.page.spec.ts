import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationStudentsPage } from './information-students.page';

describe('InformationStudentsPage', () => {
  let component: InformationStudentsPage;
  let fixture: ComponentFixture<InformationStudentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
