import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesSmartComponent } from './favorites-smart.component';

describe('FavoritesSmartComponent', () => {
  let component: FavoritesSmartComponent;
  let fixture: ComponentFixture<FavoritesSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
