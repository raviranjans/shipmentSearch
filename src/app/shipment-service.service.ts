import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentServiceService {
  data: any=[];
  shipmentD: any;

  private searchResultsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public searchResults$: Observable<any[]> = this.searchResultsSubject.asObservable();


  constructor(private http: HttpClient,private router: Router) { }

  getShipments(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>('assets/shipment-list.json').pipe(
      map(data => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.Shipments.Shipment.slice(startIndex, endIndex);
      })
    );
  }
  searchShipment(searchForm: FormGroup): void {
    type SearchCriteria = {
      OrderNo: string;
      ShipmentNo: string;
      FirstName: string;
      LastName: string;
      EMailID: string;
      DayPhone: string;
    };
    const searchCriteria = {
      OrderNo: searchForm.get('orderNumber')?.value || '',
      ShipmentNo: searchForm.get('shipmentNumber')?.value || '',
      FirstName: searchForm.get('firstName')?.value || '',
      LastName: searchForm.get('lastName')?.value || '',
      EMailID: searchForm.get('email')?.value || '',
      DayPhone: searchForm.get('phoneNumber')?.value || '',
    };

    this.http.get<any>('assets/shipment-list.json').subscribe(data => {
      const filteredResults = data.Shipments.Shipment.filter((shipment: any) => {
        return Object.keys(searchCriteria).every((key: string) => {
          const searchKey = key as keyof SearchCriteria;
          if (searchCriteria[searchKey] === '') {
            return true;
          } else if (searchKey === 'OrderNo' || searchKey === 'ShipmentNo') {
            return shipment[searchKey] && shipment[searchKey].toLowerCase().includes(searchCriteria[searchKey].toLowerCase());
          } else {
            return shipment.BillToAddress[searchKey] && shipment.BillToAddress[searchKey].toLowerCase().includes(searchCriteria[searchKey].toLowerCase());
          }
        });
      });
      this.searchResultsSubject.next(filteredResults);
    });
  }

shipmentDetails(data:any){
  this.http.get<any>('assets/shipment-details.json').subscribe(res=>{
      if(res["Shipment"]["ShipmentNo"]==data){
       this.shipmentD=res["Shipment"]
       this.router.navigate(['/shipment/shipmentDetails']);
      }else{
        this.shipmentD = ''
      }
  })
}
}


