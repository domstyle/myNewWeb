import { Component, OnInit } from '@angular/core';
import {ApiKeyRequest} from "@dapi/sdk-core";
import {OrderApi, OrderReply} from "@dapi/sdk";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderApi: OrderApi;
  order$: Promise<OrderReply>;

  constructor(private route: ActivatedRoute) {
    const proxyAddress = 'https://proxy.digitalforairlines.com/v2';
    const keyPlugin = new ApiKeyRequest('HudqcZSuXzXgR3YgsUlwoBZZ0Ue137tx', 'Authorization');

    this.orderApi = new OrderApi(proxyAddress, [keyPlugin]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.order$ = this.orderApi.retrieveOrder({orderId: param.get('orderId')});
    });
  }
}
