import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { ShipmentSearchComponent } from './shipment-search/shipment-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export function HttpLoaderFactory(http: HttpClient) {
return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    ShipmentSearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ]
})
export class HomeModule { }
