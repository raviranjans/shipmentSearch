import { Component } from '@angular/core';
import { ShipmentServiceService } from 'src/app/shipment-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.sass']
})
export class ShipmentDetailsComponent {

  data: boolean=true;
  shipmentDetails: any;
  shipmentLine: any;

  constructor(private shipmentService: ShipmentServiceService,private location: Location){
    
      this.shipmentDetails = this.shipmentService.shipmentD
      this.shipmentLine = this.shipmentDetails.ShipmentLines["ShipmentLine"]


  }


  expand(){
    if(this.data==true){
      this.data = false;
    }else{
      this.data=true;
    }
  }

  goBack(): void {
    this.location.back();
  }

}
