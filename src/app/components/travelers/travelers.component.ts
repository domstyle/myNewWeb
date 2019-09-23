import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Cart, CartApi, CartReply, Email, OrderApi, OrdersListReply} from "@dapi/sdk";
import {ApiKeyRequest, utils} from "@dapi/sdk-core";

@Component({
  selector: 'app-travelers',
  templateUrl: './travelers.component.html',
  styleUrls: ['./travelers.component.css']
})
export class TravelersComponent implements OnInit {

  private cartApi: CartApi;
  private orderApi: OrderApi;

  cart: Cart;
  contactInfo: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const proxyAddress = 'https://proxy.digitalforairlines.com/v2';
    const keyPlugin = new ApiKeyRequest('HudqcZSuXzXgR3YgsUlwoBZZ0Ue137tx', 'Authorization');

    this.cartApi = new CartApi(proxyAddress, [keyPlugin]);
    this.orderApi = new OrderApi(proxyAddress, [keyPlugin]);

    this.route.paramMap.subscribe(async params => {
      const cartId: string = params.get('cartId');
      const cartReplay: CartReply = await this.cartApi.retrieveCart({cartId: cartId});
      this.cart = cartReplay.data;

      if ( this.cart.contacts && this.cart.contacts.length > 0 ) {
        this.contactInfo = (this.cart.contacts[0] as any).address;
      }

      console.log(this.cart);
      this.cart.travelers.forEach(trv => {
        if ( !trv.names || trv.names.length == 0 ) {
          trv.names = [{firstName: '', lastName: ''}];
        }
      });
    });
  }

  async gotoPay() {
    await this.cartApi.patchTravelersInCart({cartId: this.cart.id, patchTravelersBody: this.cart.travelers});
    const contact: Email = {
      purpose: 'standard',
      address: this.contactInfo,
      contactType: 'Email',
      category: 'personal',
      travelerIds: this.cart.travelers.map(t => t.id)
    };
    if ( this.cart.contacts && this.cart.contacts.length > 0 ) {
      await this.cartApi.patchContactsInCart({cartId: this.cart.id, patchContactsBody: [{...contact, ...{id:this.cart.contacts[0].id}}]});
    } else {
      await this.cartApi.createContactsInCart({cartId: this.cart.id, postContactsBody: [contact]});
    }

    const orderReply: OrdersListReply = await this.orderApi.createOrder({cartId: this.cart.id});
    console.log(orderReply.data)

    this.router.navigate([`/booking/order/${orderReply.data[0].id}`]);
  }

}
