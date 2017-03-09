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
  constructor(private event: OwnedeventsService) { }

  openForm(){
    this.isInputDisabled = !this.isInputDisabled;
    this.listdisabled = true;
  }

  openList(){
    this.isInputDisabled = true;
    this.listdisabled = !this.listdisabled;
  }

  ngOnInit() {
    this.event.getList()
      .subscribe((events) => {
        console.log(events);
        this.events = events;
      });
  }

}
