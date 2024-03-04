import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ShipmentServiceService } from 'src/app/shipment-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shipment-search',
  templateUrl: './shipment-search.component.html',
  styleUrls: ['./shipment-search.component.sass']
})
export class ShipmentSearchComponent {
  data:any;
  searchForm: FormGroup
  constructor(private translate: TranslateService,private shipmentService: ShipmentServiceService,private router: Router,private fb: FormBuilder){

    translate.setDefaultLang('en');
    translate.use('en'); 

    this.searchForm = this.fb.group({
      orderNumber: [''],
      shipmentNumber: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: ['']
    });

  }

  search(){
    this.shipmentService.searchShipment(this.searchForm);
     this.router.navigate(['/shipment/results']);
 }

}
