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

    shuffle(array){
       for (let i = array.length; i; i--) {
           let j = Math.floor(Math.random() * i);
           [array[i - 1], array[j]] = [array[j], array[i - 1]];
       }
   }
    pairing(array){
      this.sortedList=array.slice().reverse();
      console.log( this.sortedList);
      var halfArray=Math.ceil(array.length /2);
      var arrayInHalf=array.slice().splice(0,halfArray);
      var sortedInHalf=this.sortedList.slice().splice(0,halfArray);

      this.shuffle(arrayInHalf);
      this.shuffle(sortedInHalf);
      this.sortedPaired=[arrayInHalf,sortedInHalf];
      console.log(this.sortedPaired);

    }
    suffleList(){
      this.shuffle(this.sortedPaired[0]);
      this.shuffle(this.sortedPaired[1]);
    }

  ShowResults(winner){
    console.log("And the winner is : "+winner.name);
    console.log("The state is: "+winner.active);
    var objectUpdate ={
      "points":(winner.points+100),
      "active":false,
      "wins":(winner.wins+1)
    }
    this.event.updatePoints(winner._id,objectUpdate).subscribe((e) => {
      console.log("Winner  Updated");
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
            console.log(participantsListEvent);
          this.rankedList = participantsListEvent.slice();
          console.log(this.rankedList );
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
  (this.finalList.push(winner),this.counter++,console.log("Finalists "+winner.name)) :
  console.log(" All finalist are already added");
  console.log(this.finalList);
}

final(){
    console.log (this.finalList);
    this.finalActive = !this.finalActive;
    }

totalWinner(finalWinner){
  this.tournamentWinner=finalWinner;
  console.log("WINNER OF ALL:" );
  console.log(this.tournamentWinner.name);
  this.tournamentEnds =true;
}


  }
