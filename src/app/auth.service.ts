import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = '/RouletteAPI/roulette/login/';

  constructor(private http: HttpClient, private router: Router) { }

  login(customerId: String) {
     return this.http.get<any>(this.loginURL + customerId);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/home'])
  }
}
