import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OwnedeventsService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) {}
  
  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getList() {
    return this.http.get(`${this.BASE_URL}/api/event`)
      .map((res) => res.json());
  }

  get(id) {
    return this.http.get(`${this.BASE_URL}/api/event/${id}`)
      .map((res) => res.json());
  }

  create(event) {
    return this.http.post(`${this.BASE_URL}/api/event`, event)
      .map(res => res.json())
      .catch(this.handleError);
  }

  remove(id) {
    return this.http.delete(`${this.BASE_URL}/api/event/${id}`)
      .map((res) => res.json());
  }
}
