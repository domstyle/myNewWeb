import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {TravelersComponent} from "./travelers.component";



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: ':cartId', component: TravelersComponent }
    ]),
    CommonModule
  ]
})
export class TravelersModule { }
