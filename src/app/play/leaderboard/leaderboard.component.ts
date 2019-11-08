import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from 'src/services/leaderboard.service';
import { Customer } from 'src/models/Customer';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderBoard: Customer[];

  constructor(private leaderBoardSvc: LeaderboardService) {
    this.leaderBoard = new Array(5);
     
  }

  loadLeaderBoard() {
    this.leaderBoardSvc.getLeaderBoard()
      .subscribe((leaderBoardResponse) => {
        this.prepareLeaderBoard(leaderBoardResponse);
      },
        (error) => {
          console.log(error);
        });
  }

  refreshLeaderBoard() {
    this.loadLeaderBoard();
  }

  prepareLeaderBoard(leaderBoardResponse) {
    this.leaderBoard[0] = leaderBoardResponse.rank1;
    this.leaderBoard[1] = leaderBoardResponse.rank2;
    this.leaderBoard[2] = leaderBoardResponse.rank3;
    this.leaderBoard[3] = leaderBoardResponse.rank4;
    this.leaderBoard[4] = leaderBoardResponse.rank5;
   
  }

  ngOnInit() {
    this.loadLeaderBoard();
  }

}
