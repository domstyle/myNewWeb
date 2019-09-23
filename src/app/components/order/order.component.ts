import { Component, OnInit } from '@angular/core';
import {ApiKeyRequest} from "@dapi/sdk-core";
import {CartApi, OrderApi} from "@dapi/sdk";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderApi: OrderApi;
  orders: Observable<any>;

  constructor(private route: ActivatedRoute) {
    const proxyAddress = 'https://proxy.digitalforairlines.com/v2';
    const keyPlugin = new ApiKeyRequest('HudqcZSuXzXgR3YgsUlwoBZZ0Ue137tx', 'Authorization');

    this.orderApi = new OrderApi(proxyAddress, [keyPlugin]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.orders = this.orderApi.retrieveOrder({orderId: param.get('orderId')});
    });
  }

}
