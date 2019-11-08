import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  providers: [CustomerService]
})
export class PlayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
