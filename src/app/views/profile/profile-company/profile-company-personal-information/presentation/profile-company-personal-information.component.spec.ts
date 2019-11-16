import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompanyPersonalInformationComponent } from './profile-company-personal-information.component';

describe('ProfileCompanyPersonalInformationComponent', () => {
  let component: ProfileCompanyPersonalInformationComponent;
  let fixture: ComponentFixture<ProfileCompanyPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCompanyPersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompanyPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
