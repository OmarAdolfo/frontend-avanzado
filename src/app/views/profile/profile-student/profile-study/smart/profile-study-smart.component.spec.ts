import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStudySmartComponent } from './profile-study-smart.component';

describe('ProfileStudySmartComponent', () => {
  let component: ProfileStudySmartComponent;
  let fixture: ComponentFixture<ProfileStudySmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStudySmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStudySmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
