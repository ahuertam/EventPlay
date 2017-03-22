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
  @Input ()  currentList:any;
  sortedList:any;
  rankedList:any;
  sortedPaired:any;
  objectUpdate:any;
  semifinalList:any;
  finalList:any;
  counter:any;
  winner:any;
  tournamentWinner:any;
  semifinalActive: boolean = false;
  finalActive: boolean = false;
  tournamentEnds:boolean =false;
  tournamentStarts:boolean =false;
  constructor(public event: OwnedeventsService) { }

  ngOnInit() {
    this.individual(this.currentEvent);
  }
  individual(id) {
    this.event.get(id)
    .subscribe((individual) => {
      this.individual = individual;
    });
  }
  showParticipants(){
    this.tournamentStarts=true;
    this.counter=0;
    this.semifinalActive = false;
    this.finalActive = false;
    this.finalList= [];
    this.winner=[];
    this.tournamentWinner={};
    this.tournamentEnds =false;
    this.openParticipantList(this.currentEvent);
  }

  openParticipantList(id){
    this.event.getAllinscriptions(id)
      .subscribe(
        (participantsListEvent) => {
        this.currentList = participantsListEvent;
        this.sortedList = participantsListEvent;
        this.pairing(this.sortedList);
        });
    }

    shuffle(array){
       for (let i = array.length; i; i--) {
           let j = Math.floor(Math.random() * i);
           [array[i - 1], array[j]] = [array[j], array[i - 1]];
       }
   }
    pairing(array){
      this.sortedList=array.slice().reverse();
      var halfArray=Math.ceil(array.length /2);
      var arrayInHalf=array.slice().splice(0,halfArray);
      var sortedInHalf=this.sortedList.slice().splice(0,halfArray);

      this.shuffle(arrayInHalf);
      this.shuffle(sortedInHalf);
      this.sortedPaired=[arrayInHalf,sortedInHalf];

    }
    suffleList(){
      for(let i=0;i<this.currentList.length;i++){
        var objectUpdate ={
          "points":this.currentList[i].points,
          "active":true,
          "times":this.currentList[i].times
        }
        this.event.updatePoints(this.currentList[i]._id,objectUpdate).subscribe((e) => {
          this.showParticipants();
          });
      }
      this.shuffle(this.sortedPaired[0]);
      this.shuffle(this.sortedPaired[1]);
    }
  restartList(){
    for(let i=0;i<this.currentList.length;i++){
      var objectUpdate ={
        "points":0,
        "active":true,
        "times":0
      }
      this.event.updatePoints(this.currentList[i]._id,objectUpdate).subscribe((e) => {
        this.showParticipants();
        });
    }

  }
  loses(loser){
    var objectUpdate ={
      "points":loser.points,
      "active":false,
      "times":(loser.times+1)
    }
    this.event.updatePoints(loser._id,objectUpdate).subscribe((e) => {
      this.showParticipants();
      });
  }
  ShowResults(winner){
    var objectUpdate ={
      "points":(winner.points+100),
      "active":false,
      "times":(winner.times+1)
    }
    this.event.updatePoints(winner._id,objectUpdate).subscribe((e) => {
      this.showParticipants();
      });
    }

    sortByPoints(array){
      this.currentList = array.slice();
      this.currentList=this.currentList.sort(function(a, b) {
        return parseFloat(b.points) - parseFloat(a.points);
      });
    }

    semifinals(){
      this.event.getAllinscriptions(this.currentEvent)
        .subscribe(
          (participantsListEvent) => {
          this.rankedList = participantsListEvent.slice();
          this.rankedList=this.rankedList.sort(function(a, b) {
            return parseFloat(b.points) - parseFloat(a.points);
              });
              this.semifinalList=this.rankedList;
          this.semifinalActive = !this.semifinalActive;
          });
    }
resetCounter(){
  this.counter=0;

}

finals(winner){
  (this.counter<2)?
  (this.finalList.push(winner),this.counter++) :
  " All finalist are already added";
}

final(){
    this.finalActive = !this.finalActive;
    }

totalWinner(finalWinner){
  this.tournamentWinner=finalWinner;
  this.tournamentEnds =true;
}


  }
