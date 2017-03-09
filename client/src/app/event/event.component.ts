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
  isInputDisabled: boolean = true;
  listdisabled: boolean = true;
  individualDisabled:boolean = true;
  formInfo = {
    name: '',
    tokenAccess: '',
    description: '',
    tag: '',
  };
  constructor(private event: OwnedeventsService) { }

  ngOnInit() {
    this.event.getList()
      .subscribe((events) => {
        console.log(events);
        this.events = events;
      });
  }

  add(){
    this.event.create(this.formInfo);
  }
  individual(id) {
    console.log(id);
    this.event.get(id)
    .subscribe((individual) => {
      console.log(individual);
      this.individual = individual;
      this.tagIndividual();
    });

  }
  tagIndividual(){
    this.individualDisabled = !this.individualDisabled;
  }
  openForm(){
    this.individualDisabled = true;
    this.listdisabled = true;
    this.isInputDisabled = !this.isInputDisabled;
  }

  edit(id){
    console.log(id);
    this.isInputDisabled = true;
    this.listdisabled = true;
    this.individual(id);
  }
  openList(){
    this.isInputDisabled = true;
    this.individualDisabled = true;
    this.listdisabled = !this.listdisabled;
  }



}
