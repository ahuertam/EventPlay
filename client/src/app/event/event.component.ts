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
  constructor(private event: OwnedeventsService) { }

  ngOnInit() {
    this.event.getList()
      .subscribe((events) => {
        console.log(events);
        this.events = events;
      });
  }

}
