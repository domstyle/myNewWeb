import { Component, OnInit } from '@angular/core';
import {Route, ActivatedRoute, Router} from '@angular/router';
import { BookingSearchCriteria } from '../../models/booking-search-criteria';
import {AirOfferApi, AirOffersListReply, AirOffersListReplyData, AirOffer, Bound, CartApi} from '@dapi/sdk';
import { ApiKeyRequest, utils } from '@dapi/sdk-core';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  outgoingOffers: Bound[];
  incomingOffers: Bound[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  airOfferApi: AirOfferApi;
  cartApi: CartApi;
  airOffers: AirOffer[];

  bookingSearchCriteria: BookingSearchCriteria;

  ngOnInit() {
    const proxyAddress = 'https://proxy.digitalforairlines.com/v2';
    const keyPlugin = new ApiKeyRequest('HudqcZSuXzXgR3YgsUlwoBZZ0Ue137tx', 'Authorization');

    this.airOfferApi = new AirOfferApi(proxyAddress, [keyPlugin]);
    this.cartApi = new CartApi(proxyAddress, [keyPlugin]);

    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.bookingSearchCriteria = {
        departureAirportCode: params.get('from'),
        destinationAirportCode: params.get('to'),
        departureDate: params.get('departDate'),
        returnDate: params.get('returnDate'),
        adultsCount: parseInt(params.get('adults'), 10),
        childrenCount: parseInt(params.get('children'), 10),
        infantsCount: parseInt(params.get('infants'), 10)
      }
    });

    (async () => {
      const trvs = [];
      if (this.bookingSearchCriteria.adultsCount > 0) {trvs.push(`${this.bookingSearchCriteria.adultsCount}ADT`);}
      if (this.bookingSearchCriteria.childrenCount > 0) {trvs.push(`${this.bookingSearchCriteria.childrenCount}CHD`);}
      if (this.bookingSearchCriteria.infantsCount > 0) {trvs.push(`${this.bookingSearchCriteria.infantsCount}INF`);}

      const airOffersReply: AirOffersListReply = await this.airOfferApi.airShopping({
          originLocationCode: this.bookingSearchCriteria.departureAirportCode,
          destinationLocationCode: this.bookingSearchCriteria.destinationAirportCode,
          departureDateTime: new utils.DateTime(this.bookingSearchCriteria.departureDate),
          ...(!!this.bookingSearchCriteria.returnDate ? {returnDateTime: new utils.DateTime(this.bookingSearchCriteria.returnDate)} : {}),
        commercialFareFamilies: ['CFFDEMO'],
        travelers: trvs
      });

      const offers: AirOffersListReplyData = airOffersReply.data;
      this.airOffers = offers.airOffers;
      const uniqueBoundsList = [[], []];
      this.airOffers.forEach((airOffer: AirOffer) => {
        const air = airOffer.offerItems[0].air;
        const bounds = air.bounds;

        bounds.forEach((bound, boundIdx) => {
          if ( uniqueBoundsList[boundIdx].filter(b => (b.id === bound.id && b.fareFamilyCode === bound.fareFamilyCode)).length === 0 ) {
            uniqueBoundsList[boundIdx].push(bound);
          }
        });
      });

      this.outgoingOffers = uniqueBoundsList[0];
      if ( uniqueBoundsList[1].length > 0 ) {
        this.incomingOffers = uniqueBoundsList[1];
      }
      console.log(uniqueBoundsList);
    })();
  }

  async addToCart() {
    const outgoing = document.forms[0].outgoing.value;
    const incoming = document.forms[0].incoming.value;
    let selectedOffer: AirOffer;

    if (!!outgoing && (!this.incomingOffers||!!incoming)) {
      const offers: AirOffer[] = this.airOffers.filter(o => {
        return `${o.offerItems[0].air.bounds[0].id}/${o.offerItems[0].air.bounds[0].fareFamilyCode}` === outgoing
        && (o.offerItems[0].air.bounds.length == 1 || `${o.offerItems[0].air.bounds[1].id}/${o.offerItems[0].air.bounds[1].fareFamilyCode}` === incoming)
      });

      selectedOffer = offers[0];
    }

    const cartReply = await this.cartApi.createCart({postCartBody: {airOfferId: selectedOffer.id}});
    console.log(cartReply);

    this.router.navigate([`/booking/traveler/${cartReply.data.id}`]);
  }
}
