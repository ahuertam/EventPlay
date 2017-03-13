import { Component, OnInit,EventEmitter,Input } from '@angular/core';
import { OwnedeventsService } from '../ownedevents.service';
@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
  providers: [OwnedeventsService]
})
export class TournamentComponent implements OnInit {
  @Input () currentEvent :any;
  radio;
  currentList:any;
  sortedList:any;
  sortedPaired:any;
  objectUpdate:any;
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
        this.currentList = participantsListEvent;
        this.sortedList = participantsListEvent;
        this.pairing(this.sortedList);
        });
    }
    pairing(array){
      this.sortedList=array.slice().reverse();
      console.log( this.sortedList);
      this.sortedPaired=[array,this.sortedList];
      console.log(this.sortedPaired);

    }
  ShowResults(winner){
    console.log("And the winner is : "+winner.name);
    console.log("The state is: "+winner.active);
    var objectUpdate ={
      "points":(winner.points+100),
      "active":winner.active=!winner.active,
      "wins":(winner.wins+1)
    }
    this.event.updatePoints(winner._id,objectUpdate).subscribe((e) => {
      console.log("Winner  Updated");
      this.showParticipants();
      });
  }

  }
