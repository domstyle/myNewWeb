import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BookingGateComponent } from './booking-gate.component'
import { AirportSearchComponent } from '../airport-search/airport-search.component';
import { RouterModule } from '@angular/router'
import { MyFilterPipe } from '../../pipe/my-filter.pipe';

@NgModule({
  declarations: [
    BookingGateComponent,
    AirportSearchComponent,
    MyFilterPipe
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: BookingGateComponent }
    ]),
    CommonModule,
    HttpClientModule
  ]
})
export class BookingGateModule { }
