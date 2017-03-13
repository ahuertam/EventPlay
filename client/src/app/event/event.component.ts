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
  EventList:any;
  EventOnlyList:any;
  user:any;
  participantsList :any;
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
     event.getList().subscribe((EventList) => {this.EventList = EventList});
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

  add(){
    this.event.create(this.eventInfo).subscribe((e) => console.log("Event created"));
  }

  addParticipant(id){
    console.log(id);
    console.log(this.formParticipant);
      this.event.addParticipant(id,this.formParticipant).subscribe((e) => console.log("Event created"));

  }

  individual(id) {
    this.event.get(id)
    .subscribe((individual) => {
      this.individual = individual;
      this.tagIndividual();
      this.event.getAllinscriptions(id)
        // .subscribe(
        //   (participantsList) => {
        //     console.log(participantsList);
        //   this.participantsList = participantsList;
        //   });
    });
    this.event.get(id).subscribe((EventOnlyList) => {this.EventOnlyList = EventOnlyList});
    console.log("individual");
    console.log(this.EventOnlyList);
    this.openParticipantList(id);
  }

  openParticipantList(id){
    this.event.getAllinscriptions(id)
      .subscribe(
        (participantsListEvent) => {
          console.log(participantsListEvent);
        this.participantsListEvent = participantsListEvent;
        });
    }


  tagIndividual(){
    this.individualDisabled = !this.individualDisabled;
  }

  openForm(){
    console.log("openform")
    if (this.listdisabled ==false){this.listdisabled = !this.listdisabled;}
    if (this.individualDisabled ==false){this.individualDisabled = !this.individualDisabled;}
    this.isInputDisabled = !this.isInputDisabled;

  }

  edit(id){
     console.log("edit");
    if (this.listdisabled ==false){this.listdisabled = !this.listdisabled;}
    this.individual(id);
  }
  openList(){
    if (this.individualDisabled ==false){this.individualDisabled = !this.individualDisabled;}
    this.listdisabled = !this.listdisabled;
    console.log(this.EventList);
  }


  remove(id){
    this.event.remove(id).subscribe((e) => console.log("Event Erased"));
  }

  removeParticipant(participant){
    console.log(participant);
    this.event.removeParticipant(participant).subscribe((e) => console.log("participant Erased"));
  }

}
