import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersDetailSmartComponent } from './offers-detail-smart.component';

describe('OffersDetailSmartComponent', () => {
  let component: OffersDetailSmartComponent;
  let fixture: ComponentFixture<OffersDetailSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersDetailSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersDetailSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
