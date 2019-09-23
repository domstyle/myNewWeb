import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainScreenComponent } from './components/main-screen/main-screen.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'booking', children: [
    { path: '', pathMatch: 'full', redirectTo: '/booking/gate' },
    { path: 'gate', loadChildren: () => import('./components/booking-gate/booking-gate.module').then(mod => mod.BookingGateModule) },
    { path: 'search', loadChildren: () => import('./components/flight-search/flight-search.module').then(mod => mod.FlightSearchModule) },
    { path: 'traveler', loadChildren: () => import('./components/travelers/travelers.module').then(mod => mod.TravelersModule) },
    { path: 'order', loadChildren: () => import('./components/order/order.module').then(mod => mod.OrderModule) }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
