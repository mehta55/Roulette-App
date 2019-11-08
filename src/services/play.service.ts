import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayRequest } from 'src/models/PlayRequest';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  private playURL;

  constructor(private http: HttpClient, private customerSvc: CustomerService) {
    this.playURL = '/RouletteAPI/roulette/customer/' + customerSvc.getCustomerIdFromStorage() + '/play';
   }

  play(playRequest: PlayRequest) {
    // console.log(this.playURL);
    let playHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.playURL, JSON.stringify(playRequest), {
      headers: playHeaders
    });
  }
}
