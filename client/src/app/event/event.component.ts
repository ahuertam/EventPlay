import { Component, OnInit,EventEmitter,Input } from '@angular/core';
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
  user:any;
 @Input() participantsList :any;
  participantsListEvent:any;
  isInputDisabled: boolean = true;
  listdisabled: boolean = true;
  individualDisabled:boolean = true;
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
///EVENT FORM
openForm(){
  console.log("openform")
  if (this.listdisabled ==false){this.listdisabled = !this.listdisabled;}
  if (this.individualDisabled ==false){this.individualDisabled = !this.individualDisabled;}
  this.isInputDisabled = !this.isInputDisabled;
}
  add(){
    this.event.create(this.eventInfo).subscribe((e) => console.log("Event created"));
  }
/////END EVENT form

//EVENT LIST
  edit(id){
     console.log("edit");
    if (this.listdisabled ==false){this.listdisabled = !this.listdisabled;}
    this.individual(id);
  }
  openList(){
    this.event.getList()
      .subscribe((events) => {
        console.log(events);
        this.events = events;
      });
    if (this.individualDisabled ==false){this.individualDisabled = !this.individualDisabled;}
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
  .subscribe((individual) => {
    this.individual = individual;
    this.tagIndividual();
    this.event.getAllinscriptions(id)
  });
  this.openParticipantList(id);
}

tagIndividual(){
  this.individualDisabled = !this.individualDisabled;
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

    }

  removeParticipant(participant){
    console.log(participant);
    this.event.removeParticipant(participant).subscribe((e) => console.log("participant Erased"));
  }

}
