import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SessionService {
  BASE_URL: string = 'http://localhost:3000';
  options: Object = {withCredentials:true};

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${this.BASE_URL}/signup`, user, this.options) // Use ,{withCredentials:true}
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    console.log(user);
    return this.http.post(`${this.BASE_URL}/login`, user, this.options)// Use
      .map(res => res.json())
      .catch(this.handleError);
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
