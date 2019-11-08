import { Injectable } from '@angular/core';
import { Customer } from 'src/models/Customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private leaderBoradURL = '/RouletteAPI/roulette/leaderBoard';
  
  constructor(private http: HttpClient) { }

  getLeaderBoard() {
    return this.http.get<any>(this.leaderBoradURL);
  }
}
