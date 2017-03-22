import { Component, OnInit,EventEmitter,Input } from '@angular/core';
import { OwnedeventsService } from '../ownedevents.service';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  providers: [OwnedeventsService]
})
export class LeaderboardComponent implements OnInit {
  @Input () currentEvent :any;
  currentList:any;
  constructor(public event: OwnedeventsService) { }

  ngOnInit() {
  }

  showParticipants(){
    this.openParticipantList(this.currentEvent);
  }

  openParticipantList(id){
    this.event.getAllinscriptions(id)
      .subscribe(
        (participantsListEvent) => {
          this.sortByPoints(participantsListEvent);
        });
    }
    sortByPoints(array){
      this.currentList = array.slice();
      this.currentList=this.currentList.sort(function(a, b) {
        return parseFloat(b.points) - parseFloat(a.points);
      });
    }

    UpdatePoints(participant,points){
      var Points = {
        "points":points,
        "active":true,
        "times":+0
      }
      this.event.updatePoints(participant,Points).subscribe((e) => {;
        this.showParticipants();
        });
    }


}
