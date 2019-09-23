import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Cart, CartApi, CartReply} from "@dapi/sdk";
import {ApiKeyRequest} from "@dapi/sdk-core";

@Component({
  selector: 'app-travelers',
  templateUrl: './travelers.component.html',
  styleUrls: ['./travelers.component.css']
})
export class TravelersComponent implements OnInit {

  cartApi: CartApi;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const proxyAddress = 'https://proxy.digitalforairlines.com/v2';
    const keyPlugin = new ApiKeyRequest('HudqcZSuXzXgR3YgsUlwoBZZ0Ue137tx', 'Authorization');

    this.cartApi = new CartApi(proxyAddress, [keyPlugin]);

    this.route.paramMap.subscribe(params => {
      console.log(params);
      const cartId: string = params.get('cartId');
      const cart: CartReply = this.cartApi.retrieveCart({cartId: cartId});
      console.log(cart);
    });
  }

}
