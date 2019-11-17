import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLanguageSmartComponent } from './profile-language-smart.component';

describe('ProfileLanguageSmartComponent', () => {
  let component: ProfileLanguageSmartComponent;
  let fixture: ComponentFixture<ProfileLanguageSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLanguageSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLanguageSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
