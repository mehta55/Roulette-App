import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
import { Customer } from 'src/models/Customer';
import { PlayRequest } from 'src/models/PlayRequest';
import { PlayService } from 'src/services/play.service';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit {

  customer: Customer;
  playrequest: PlayRequest;

  resultModal_header: string;
  resultModal_body: string;
  reusltModal_footer_primaryBtn_txt: string;
  reusltModal_footer_secondaryBtn_txt: string;

  constructor(private customerSvc: CustomerService, private playSvn: PlayService) {
    this.reset();

  }

  play() {
    this.playSvn.play(this.playrequest)
      .subscribe((playResponse) => {
        
        if (playResponse.success) {
          this.prepareResultModal(playResponse.rouletteNumber, playResponse.betResult);
          this.customerSvc.updateCustomer(this.customer.name, playResponse.balance);
        } else {
          this.prepareErrorModal();
        }
      },
        (error) => {
          console.log(error);
        });


  }

  reset() {
    this.playrequest = new PlayRequest();
    this.playrequest.firstTwelveBet = 0;
    this.playrequest.secondTwelveBet = 0;
    this.playrequest.thirdTwelveBet = 0;
    this.playrequest.zeroBet = 0;
    this.playrequest.firstHalfBet = 0;
    this.playrequest.secondHalfBet = 0;
    this.playrequest.evenBet = 0;
    this.playrequest.oddBet = 0;
    this.playrequest.totalBet = this.getTotalBet();
  }

  validBet(): boolean {
    var totalBet = this.getTotalBet();
    return totalBet >= 500 && totalBet <= 10000;
  }

  getTotalBet(): number {
    return this.playrequest.firstTwelveBet
      + this.playrequest.secondTwelveBet
      + this.playrequest.thirdTwelveBet
      + this.playrequest.firstHalfBet
      + this.playrequest.secondHalfBet
      + this.playrequest.evenBet
      + this.playrequest.oddBet
      + this.playrequest.zeroBet;
  }

  updateBalance(newBalance: number) {
    this.customerSvc.updateCustomer(this.customer.name, newBalance);
  }

  prepareResultModal(rouletteNumber: number, betResult: number) {
    if (betResult > 0) {
      this.resultModal_header = "YOU WON";
      this.resultModal_body = "Roulette Number is " + rouletteNumber + ". \n You won Rs." + betResult + "! coins";
    } else {
      this.resultModal_header = "YOU LOST";
      this.resultModal_body = "Roulette Number is " + rouletteNumber + ". \n You lost " + (betResult * -1) + " coins!";
    }
    this.reusltModal_footer_primaryBtn_txt = "Play Again!!"
    this.reusltModal_footer_secondaryBtn_txt = "Exit"
  }

  prepareErrorModal() {
    this.resultModal_header = "ERROR";
    this.resultModal_body = "Sorry " + this.customer.name + " !! \n You have insufficient balance for your selection."
    this.reusltModal_footer_primaryBtn_txt = "Reset Game";
    this.reusltModal_footer_secondaryBtn_txt = "Close"
  }

  ngOnInit() {
    this.customerSvc.customer.subscribe(customer => this.customer = customer);
  }

}

