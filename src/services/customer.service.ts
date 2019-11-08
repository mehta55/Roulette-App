import { Injectable } from '@angular/core';
import { Customer } from 'src/models/Customer';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AES, enc } from 'crypto-js';  


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private loginURL = '/RouletteAPI/roulette/customer/';
  private customerId: string;

  private customerSource;
  public customer;

  updateCustomer(name: string, balance: number) {
    this.customerSource.next(new Customer(name, balance));
  }

  constructor(private http: HttpClient) {
    this.customerId = localStorage.getItem('token');

    this.customerSource = new BehaviorSubject<Customer>(new Customer('User', 0));
    this.customer = this.customerSource.asObservable();

    // In case of page reload
    if (this.customerId) {
      this.loadCustomer();
    }
  }

  loadCustomer() {
    this.customerId = this.getCustomerIdFromStorage();
    this.http.get<any>(this.loginURL + this.customerId)
      .subscribe((response) => {
        this.customerSource.next(new Customer(response.name, response.balance));
      },
        (error) => {
          console.log(error);
        })
  }

  getCustomerIdFromStorage(): string {
    var encryptedCustomerId = localStorage.getItem('token');
    return AES.decrypt(encryptedCustomerId, 'Secret-Key').toString(enc.Utf8);
  }

  setCustomerIdInStorage(plainCustomerId: string) {
     var encryptedCustomerId =  AES.encrypt(plainCustomerId, 'Secret-Key').toString();
     localStorage.setItem('token', encryptedCustomerId);
  }
}
