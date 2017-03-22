import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

// import { Event } from '../../../server/api/event/event.model';

@Injectable()
export class OwnedeventsService {
  BASE_URL: string = environment.apiUrl;
  options: Object = {withCredentials:true};
  EventListEmitter =new EventEmitter();
  ParticipantListEmitter =new EventEmitter();
  // EventAloneEmitter= new EventEmitter();
  constructor(private http: Http) {}

  handleError(e) {
    return Observable.throw(e.json().message);
  }

/////////////////////////GET
  getList() {
    return this.http.get(`${this.BASE_URL}/api/event`, this.options)
      .map((res) => res.json())
      .map((EventList) => {this.EventListEmitter.emit(EventList);return EventList});
  }

  get(id) {
    return this.http.get(`${this.BASE_URL}/api/event/${id}`, this.options)
    .map((res) => res.json());
    // .map((EventAlone) => {this.EventListEmitter.emit(EventAlone);return EventAlone});

  }
        ////PARTICIPANT

getAllinscriptions(id) {
  return this.http.get(`${this.BASE_URL}/api/event/participant/${id}`, this.options)
  .map((res) => res.json())
  .map((ParticipantList) => {this.ParticipantListEmitter.emit(ParticipantList);return ParticipantList});
  ;
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


  ////////////////put
    updatePoints(participant,update) {
      return this.http.put(`${this.BASE_URL}/api/event/participant/${participant}`, update, this.options)
        .map((res) => res.json())
        .catch(this.handleError);
    }


///////////////////DELETE
  remove(id) {
    return this.http.delete(`${this.BASE_URL}/api/event/${id}`, this.options)
      .map((res) => res.json());

  }

  removeParticipant(participant) {
    return this.http.delete(`${this.BASE_URL}/api/event/participant/${participant}`, this.options)
      .map((res) => res.json());
  }


}
