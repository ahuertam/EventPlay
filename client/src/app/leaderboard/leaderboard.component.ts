import { Component, OnInit,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  providers: []
})
export class LeaderboardComponent implements OnInit {
  participantsList:any;
  constructor() { }

  ngOnInit() {
  }

  showParticipants(){
    console.log(this.participantsList);
  }

}
