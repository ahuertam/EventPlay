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
    console.log(this.currentEvent);
    this.openParticipantList(this.currentEvent);
  }

  openParticipantList(id){
    this.event.getAllinscriptions(id)
      .subscribe(
        (participantsListEvent) => {
          console.log(participantsListEvent);
          this.sortByPoints(participantsListEvent);
        });
    }
    sortByPoints(array){
      this.currentList = array.slice();
      console.log("array");
      this.currentList=this.currentList.sort(function(a, b) {
        return parseFloat(b.points) - parseFloat(a.points);
      });
      console.log(this.currentList);
    }

    UpdatePoints(participant,points){
      console.log(points);
      var Points = {"points":points}
      this.event.updatePoints(participant,Points).subscribe((e) => {
        console.log("Points  Updated");
        this.showParticipants();
        });
    }


}
