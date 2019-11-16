import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStudentPersonalInformationComponent } from './profile-student-personal-information.component';

describe('ProfileStudentPersonalInformationComponent', () => {
  let component: ProfileStudentPersonalInformationComponent;
  let fixture: ComponentFixture<ProfileStudentPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStudentPersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStudentPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
