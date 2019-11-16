import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExperienceSmartComponent } from './profile-experience-smart.component';

describe('ProfileExperienceSmartComponent', () => {
  let component: ProfileExperienceSmartComponent;
  let fixture: ComponentFixture<ProfileExperienceSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileExperienceSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExperienceSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
