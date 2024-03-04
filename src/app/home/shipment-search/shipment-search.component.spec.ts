import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentSearchComponent } from './shipment-search.component';

describe('ShipmentSearchComponent', () => {
  let component: ShipmentSearchComponent;
  let fixture: ComponentFixture<ShipmentSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentSearchComponent]
    });
    fixture = TestBed.createComponent(ShipmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
