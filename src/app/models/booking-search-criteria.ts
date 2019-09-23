export interface BookingSearchCriteria {
  departureAirportCode: string;
  destinationAirportCode: string;
  departureDate: string;
  returnDate?: string;
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
}
