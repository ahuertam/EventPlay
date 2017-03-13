import { Injectable } from '@angular/core';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Injectable()
export class CurrentUserService {
  user: any;
  userLogged = new EventEmitter();
  constructor() { }

  getEmitter(){
    return this.userLogged;
  }

  isLoggedIn():boolean{
    return this.user != undefined ? true : false;
  }

  getUser(){
    return this.user;
  }

  checkLogged(user) {
    this.user = user;
    this.userLogged.emit(user);
  }
}
