import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompanyPersonalInformationSmartComponent } from './profile-company-personal-information-smart.component';

describe('ProfileCompanyPersonalInformationSmartComponent', () => {
  let component: ProfileCompanyPersonalInformationSmartComponent;
  let fixture: ComponentFixture<ProfileCompanyPersonalInformationSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCompanyPersonalInformationSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompanyPersonalInformationSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
