import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderComponent} from "./order.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [OrderComponent],
  imports: [
    RouterModule.forChild([
      { path: ':orderId', component: OrderComponent }
    ]),
    CommonModule
  ]
})
export class OrderModule { }
