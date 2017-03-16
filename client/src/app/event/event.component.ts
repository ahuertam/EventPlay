import { Component, OnInit,EventEmitter } from '@angular/core';
import { OwnedeventsService } from '../ownedevents.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [OwnedeventsService]
})
export class EventComponent implements OnInit {
  events;
  message:any;
  user:any;
  currentEvent :any;
  participantsListEvent:any;
  isInputDisabled: boolean = true;
  listdisabled: boolean = true;
  individualDisabled:boolean = true;
  showEvent: boolean =true;
  participantMessage:any;
  individualEvent:any;
  eventInfo = {
    name: '',
    description: '',
    tokenAccess: ''
  };
  formParticipant = {
    nameParticipant: '',
    eventParticipant: '',
  };

  constructor(public event: OwnedeventsService,public session: SessionService) {
    event.EventListEmitter.subscribe((event) => {
      this.events=event;
    });
   }

  ngOnInit() {
    this.event.getList()
      .subscribe((events) => {
        console.log(events);
        this.events = events;
      });
      this.session.getLoginEvetEmitter()
        .subscribe((user) => this.user=user);
  }

  toggleAll(){
    if (this.individualDisabled ==false){this.individualDisabled = !this.individualDisabled;}
    if (this.showEvent ==false){this.showEvent = !this.showEvent;}
    if (this.isInputDisabled ==false){this.isInputDisabled = !this.isInputDisabled;}
    if (this.listdisabled ==false){this.listdisabled = !this.listdisabled;}

  }
///EVENT FORM
openForm(){
  console.log("openform")
  // if (this.listdisabled ==false){this.listdisabled = !this.listdisabled;}
  // if (this.individualDisabled ==false){this.individualDisabled = !this.individualDisabled;}
  this.isInputDisabled = !this.isInputDisabled;
  this.message="";
}
  add(){
    this.event.create(this.eventInfo).subscribe((e) => console.log("Event created"));
    this.message="Event created";
  }
/////END EVENT form

//EVENT LIST
  edit(id){
     console.log("edit");
    // if (this.listdisabled ==false){this.listdisabled = !this.listdisabled;}
    this.individual(id);
    this.participantMessage="";

  }
  openList(){
    this.event.getList()
      .subscribe((events) => {
        console.log(events);
        this.events = events;
      });
    this.listdisabled = !this.listdisabled;
  }

  remove(id){
    this.event.getList()
      .subscribe((events) => {
        console.log(events);
        this.events = events;
      });
    this.event.remove(id).subscribe((e) => console.log("Event Erased"));
  }
//END EVENT LIST

//Individual LIST 
individual(id) {
  this.event.get(id)
  .subscribe((individualEvent) => {
    this.individualEvent = individualEvent;
    this.tagIndividual();
    this.event.getAllinscriptions(id)
  });
  this.openParticipantList(id);
}

tagIndividual(){
  this.individualDisabled = !this.individualDisabled;
}

show(id){
  this.currentEvent=id;
  console.log(this.currentEvent);
  this.showEvent = !this.showEvent;
  this.listdisabled = !this.listdisabled;
}

//END Individual LIST

////////participant
openParticipantList(id){
  this.event.getAllinscriptions(id)
    .subscribe(
      (participantsListEvent) => {
        console.log(participantsListEvent);
      this.participantsListEvent = participantsListEvent;
      });
  }

    addParticipant(id){
      console.log(id);
      console.log(this.formParticipant);
        this.event.addParticipant(id,this.formParticipant).subscribe((e) => console.log("Parcicipant created"));
        this.participantMessage="Parcicipant created";
    }

  removeParticipant(participant){
    console.log(participant);
    this.event.removeParticipant(participant).subscribe((e) => console.log("participant Erased"));
  }

}
