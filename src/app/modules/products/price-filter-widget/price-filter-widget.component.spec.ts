import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PriceFilterWidgetComponent } from './price-filter-widget.component';

describe('PriceFilterWidgetComponent', () => {
  let component: PriceFilterWidgetComponent;
  let fixture: ComponentFixture<PriceFilterWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceFilterWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceFilterWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
