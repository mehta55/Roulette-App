import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Customer } from 'src/models/Customer';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customer: Customer;
  coustomerId: string;
  invalidCustomer: boolean;
  alertMessage: string;

  constructor(private authSvc: AuthService, private router: Router, private customerSvn: CustomerService) {
    this.invalidCustomer = false;
  }

  ngOnInit() {

  }

  logIn() {
    this.authSvc.login(this.coustomerId)
      .subscribe((response) => {
        if (response.success) {
          // localStorage.setItem('token', this.coustomerId);

          this.customerSvn.setCustomerIdInStorage(this.coustomerId);
          this.router.navigate(['/play']);
       
        } else {
          this.alert('Invalid Customer ID!')
        }
      }, (error) => {
        this.alert('Could\'nt Log In! Try Again')
      });


  }

  alert(message: string) {
    this.coustomerId = '';
    this.invalidCustomer = true;
    this.alertMessage = message;
  }

}
