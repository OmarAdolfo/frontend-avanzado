import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStudyVocationalComponent } from './profile-study-vocational.component';

describe('ProfileStudyVocationalComponent', () => {
  let component: ProfileStudyVocationalComponent;
  let fixture: ComponentFixture<ProfileStudyVocationalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStudyVocationalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStudyVocationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
