import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyFilterPipe } from '../../pipe/my-filter.pipe';

@Component({
  selector: 'app-airport-search',
  templateUrl: './airport-search.component.html',
  styleUrls: ['./airport-search.component.css']
})
export class AirportSearchComponent implements OnInit {

  constructor(private http: HttpClient) {}

  @Input() startWith: string;

  airportList:any[] = [];

  ngOnInit() {
    this.http.get('/content/koreanair-admin/cross-region/all-languages/airport-config/_jcr_content/par.listairports.json/revenue/depart/ko-kr.json').subscribe((data: any) => {
      this.airportList = data;
    });
  }

}
