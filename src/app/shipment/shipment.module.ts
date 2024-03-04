import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';
import { ShipmentResultsComponent } from './shipment-results/shipment-results.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    ShipmentDetailsComponent,
    ShipmentResultsComponent
  ],
  imports: [
    CommonModule,
    ShipmentRoutingModule,
    InfiniteScrollModule
  ]
})
export class ShipmentModule { }
