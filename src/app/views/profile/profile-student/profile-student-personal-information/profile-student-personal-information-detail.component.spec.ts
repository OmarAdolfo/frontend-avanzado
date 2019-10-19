import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStudentPersonalInformationDetailComponent } from './profile-student-personal-information-detail.component';

describe('ProfileStudentPersonalInformationDetailComponent', () => {
  let component: ProfileStudentPersonalInformationDetailComponent;
  let fixture: ComponentFixture<ProfileStudentPersonalInformationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStudentPersonalInformationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStudentPersonalInformationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
