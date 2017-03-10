import { Component, OnInit } from '@angular/core';
import { OwnedeventsService } from '../ownedevents.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [OwnedeventsService]
})
export class EventComponent implements OnInit {
  events;
  participantsList :any;
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

  constructor(public event: OwnedeventsService) { }

  ngOnInit() {
    this.event.getList()
      .subscribe((events) => {
        console.log(events);
        this.events = events;
      });

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
        .subscribe(
          (participantsList) => {
          this.participantsList = participantsList;
          });
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
  }

  remove(id){
    this.event.remove(id).subscribe((e) => console.log("Event Erased"));
  }

}
