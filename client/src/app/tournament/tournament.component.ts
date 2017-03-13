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
  currentList:any;
  sortedList:any;
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
      console.log(array);
      console.log("SORTED" );
      this.sortedList=array.slice().reverse();
      console.log( this.sortedList);
    }
  }
