import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStudentPersonalInformationSmartComponent } from './profile-student-personal-information-smart.component';

describe('ProfileStudentPersonalInformationComponent', () => {
  let component: ProfileStudentPersonalInformationSmartComponent;
  let fixture: ComponentFixture<ProfileStudentPersonalInformationSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStudentPersonalInformationSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStudentPersonalInformationSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
