import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class SessionService {
  BASE_URL: string = environment.apiUrl;
  options: Object = {withCredentials:true};
  emitter =new EventEmitter();

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${this.BASE_URL}/signup`, user, this.options) // Use ,{withCredentials:true}
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {;
    return this.http.post(`${this.BASE_URL}/login`, user, this.options)// Use
      .map(res => res.json())
      .map(user => {this.emitter.emit(user);return user})
      .catch(this.handleError);
  }
  getLoginEvetEmitter(){
    return this.emitter;
  }

  logout() {
    return this.http.post(`${this.BASE_URL}/logout`, {}, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${this.BASE_URL}/loggedIn`, this.options)
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

}
