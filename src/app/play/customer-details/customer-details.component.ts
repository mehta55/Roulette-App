import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
import { Customer } from 'src/models/Customer';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer;
 
  
  constructor(private customerSvn: CustomerService) { 
    
  }

  updateBalance(newBalance: number) {
    this.customerSvn.updateCustomer(this.customer.name, newBalance);
  }
  
  ngOnInit() {
    this.customerSvn.customer.subscribe(customer => this.customer = customer);
  }

  refreshBalance() {
    this.customerSvn.loadCustomer();
  }

}
