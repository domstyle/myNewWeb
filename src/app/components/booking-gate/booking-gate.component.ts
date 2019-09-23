import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingSearchCriteria } from '../../models/booking-search-criteria';

@Component({
  selector: 'booking-gate',
  templateUrl : './booking-gate.component.html',
  styleUrls: ['./booking-gate.component.css']
})

export class BookingGateComponent {
  public bookingSearchCriteria: BookingSearchCriteria;

  constructor(
    private router: Router
  ) {
    this.bookingSearchCriteria = {
      departureAirportCode: '',
      destinationAirportCode: '',
      departureDate: '2019-09-08',
      adultsCount: 0,
      childrenCount: 0,
      infantsCount: 0
    };
  }

  goNextPage() {
    this.router.navigate([`/booking/search/${this.bookingSearchCriteria.departureAirportCode}/${this.bookingSearchCriteria.destinationAirportCode}/${this.bookingSearchCriteria.departureDate}/${!!this.bookingSearchCriteria.returnDate?this.bookingSearchCriteria.returnDate + '/':''}${this.bookingSearchCriteria.adultsCount}/${this.bookingSearchCriteria.childrenCount}/${this.bookingSearchCriteria.infantsCount}`]);
  }

}
