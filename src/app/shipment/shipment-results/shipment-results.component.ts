import { Component } from '@angular/core';
import { ShipmentServiceService } from 'src/app/shipment-service.service';
import { Location } from '@angular/common';
import { map, Observable } from 'rxjs';

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
  selectedFilter: string | null = null;
  results: Shipment[] = [];
  showFilter = false;
  shipments: any[] = [];
  page = 1;
  pageSize = 10;
  isLoading = false;
  selectedFilters: Set<string> = new Set();


 


  constructor(public shipmentService: ShipmentServiceService,private location:Location) {

  }

  get filteredResults(): Observable<any[]> {
    if (!this.selectedFilters.size || this.selectedFilters.has('All')) {
      return this.shipmentService.searchResults$;
    } else {
      return this.shipmentService.searchResults$.pipe(
        map(results => results.filter(shipment => this.selectedFilters.has(shipment.Status)))
      );
    }
  }

  toggleFilterPopover() {
    this.showFilter = !this.showFilter;
  }

  toggleFilter(filter: string) {
    if (this.selectedFilters.has(filter)) {
      this.selectedFilters.delete(filter);
    } else {
      this.selectedFilters.add(filter);
    }
  }

  isFilterSelected(filter: string) {
    return this.selectedFilters.has(filter);
  }

  isFilterApplied() {
    return this.selectedFilters.size > 0;
  }

  resetFilters() {
    this.selectedFilters.clear();
  }

  applyFilters() {
    // Apply the selected filters here, for example:
    console.log('Selected filters:', this.selectedFilters);
    // Then you can close the filter popover or update your data accordingly
    this.showFilter = false;
  }


  shipmentDetails(data:any){
    this.shipmentService.shipmentDetails(data["target"]["innerHTML"]);   
  }
  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.searchShipment();
  }

  searchShipment(): void {
    this.page = 1;
    this.shipmentService.getShipments(this.page, this.pageSize);
  }

  loadMoreShipments(): void {
   
    if (!this.isLoading) {
      this.isLoading = true;
      this.page++;
      
      this.shipmentService.getShipments(this.page, this.pageSize).subscribe(() => {
        this.isLoading = false;
        
      });
    }
  }


}
