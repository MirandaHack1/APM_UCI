import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationCordinatorPage } from './information-cordinator.page';

describe('InformationCordinatorPage', () => {
  let component: InformationCordinatorPage;
  let fixture: ComponentFixture<InformationCordinatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationCordinatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
