import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

// import { Event } from '../../../server/api/event/event.model';

@Injectable()
export class OwnedeventsService {
  BASE_URL: string = 'http://localhost:3000';
  options: Object = {withCredentials:true};
  EventsEmitter =new EventEmitter();
  EventOnlyEmitter =new EventEmitter();
  ParticipantsEmitter =new EventEmitter();
  EventList:any;
  IndividualEvent:any;

  constructor(private http: Http) {}

  handleError(e) {
    return Observable.throw(e.json().message);
  }

/////////////////////////GET
  getList() {
    this.EventList= this.http.get(`${this.BASE_URL}/api/event`, this.options)
      .map((res) => res.json());
      this.EventsEmitter.emit(this.EventList);
      return this.EventList;
  }

  get(id) {
    console.log("service ID" + id);
    this.IndividualEvent=this.http.get(`${this.BASE_URL}/api/event/${id}`, this.options).map((res) => res.json());
    this.EventOnlyEmitter.emit(this.IndividualEvent);
    return this.IndividualEvent;
  }
        ////PARTICIPANT

getAllinscriptions(id) {
  return this.http.get(`${this.BASE_URL}/api/event/participant/${id}`, this.options)
  .map((res) => res.json());
}

addParticipant(id,obj){
  return this.http.post(`${this.BASE_URL}/api/event/participant/${id}`, obj, this.options)
    .map((res) => res.json())
    .catch(this.handleError);
}

////////////////POST
  create(event) {
    return this.http.post(`${this.BASE_URL}/api/event`, event, this.options)
      .map((res) => res.json())
      .catch(this.handleError);
  }

///////////////////DELETE
  remove(id) {
    return this.http.delete(`${this.BASE_URL}/api/event/${id}`, this.options)
      .map((res) => res.json());
  }

  removeParticipant(participant) {
    console.log(participant);
    return this.http.delete(`${this.BASE_URL}/api/event/${participant}`, this.options)
      .map((res) => res.json());
  }


}
