import { Component } from '@angular/core';
import { ShipmentServiceService } from 'src/app/shipment-service.service';
import { Location } from '@angular/common';
import { map } from 'rxjs';

interface Shipment {
  AssignedToUserId: string;
  DeliveryMethod: string;
  ExpectedShipmentDate: string;
  OrderNo: string;
  ScacAndService: string;
  ShipNode: string;
  ShipmentKey: string;
  ShipmentNo: string;
  Status: string;
  BillToAddress: {
    DayPhone: string;
    EMailID: string;
    FirstName: string;
    LastName: string;
    PersonInfoKey: string;
  };
  ShipmentLines: {
    TotalNumberOfRecords: string;
  };
}



@Component({
  selector: 'app-shipment-results',
  templateUrl: './shipment-results.component.html',
  styleUrls: ['./shipment-results.component.sass']
})
export class ShipmentResultsComponent{

  shipmentData=[];
  TotalNumberOfRecords: any;
  shipmentStatus="";


  statusOptions = ['Cancelled', 'Ready for Backroom Pick'];
  showFilter = false;
  selectedFilter: string | null = null;
  results: Shipment[] = [];



  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilter(status: string) {
    this.selectedFilter = status;
    this.showFilter = false;
  }

  isFilterApplied() {
    return !!this.selectedFilter;
  }

  isFilterSelected(status: string) {
    return this.selectedFilter === status;
  }

  constructor(public shipmentService: ShipmentServiceService,private location:Location) {

  }

  get filteredResults() {
    if (!this.selectedFilter || this.selectedFilter === 'All') {
      return this.shipmentService.searchResults$;
    } else {
      return this.shipmentService.searchResults$.pipe(
        map(results => results.filter(shipment => shipment.Status === this.selectedFilter))
      );
    }
  }

  shipmentDetails(data:any){
    this.shipmentService.shipmentDetails(data["target"]["innerHTML"]);   
  }
  goBack(): void {
    this.location.back();
  }

}
