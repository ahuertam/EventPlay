import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OwnedeventsService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) {}
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
      .map((res) => res.json());
  }

  remove(id) {
    return this.http.delete(`${this.BASE_URL}/api/event/${id}`)
      .map((res) => res.json());
  }
}
