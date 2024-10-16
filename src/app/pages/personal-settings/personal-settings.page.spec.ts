import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalSettingsPage } from './personal-settings.page';

describe('PersonalSettingsPage', () => {
  let component: PersonalSettingsPage;
  let fixture: ComponentFixture<PersonalSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
