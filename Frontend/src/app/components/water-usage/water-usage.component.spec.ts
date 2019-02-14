import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterUsageComponent } from './water-usage.component';

describe('WaterUsageComponent', () => {
  let component: WaterUsageComponent;
  let fixture: ComponentFixture<WaterUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
