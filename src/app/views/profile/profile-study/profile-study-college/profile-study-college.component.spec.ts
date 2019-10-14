import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStudyCollegeComponent } from './profile-study-college.component';

describe('ProfileStudyCollegeComponent', () => {
  let component: ProfileStudyCollegeComponent;
  let fixture: ComponentFixture<ProfileStudyCollegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStudyCollegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStudyCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
