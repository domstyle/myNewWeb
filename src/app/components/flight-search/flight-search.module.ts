import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search.component';
import { RouterModule } from '@angular/router'



@NgModule({
  declarations: [FlightSearchComponent],
  imports: [
    RouterModule.forChild([
      { path: ':from/:to/:departDate/:adults/:children/:infants', component: FlightSearchComponent },
      { path: ':from/:to/:departDate/:returnDate/:adults/:children/:infants', component: FlightSearchComponent }
    ]),
    CommonModule
  ]
})
export class FlightSearchModule { }
