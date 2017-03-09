import { Component } from '@angular/core';
import { SessionService } from "./session.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SessionService]
})
  export class AppComponent  {
    title = 'app works!';
    user: any;
    formInfo = {
      username: '',
      password: ''
    };
    error: string;
    privateData: any = '';
    isInputDisabled: boolean = true;

    constructor(private session: SessionService) { }

    ngOnInit() {
      this.session.isLoggedIn()
        .subscribe(
          (user) => this.successCb(user)
        );
    }
    openForm(){
      this.isInputDisabled = !this.isInputDisabled;
    }

    login() {
      this.session.login(this.formInfo)
        .subscribe(
          (user) => this.successCb(user),
          (err) => this.errorCb(err)
        );
    }

    signup() {
      this.session.signup(this.formInfo)
        .subscribe(
          (user) => this.successCb(user),
          (err) => this.errorCb(err)
        );
    }

    logout() {
      this.session.logout()
        .subscribe(
          () => this.successCb(null),
          (err) => this.errorCb(err)
        );
    }


    errorCb(err) {
      this.error = err;
      this.user = null;
    }

    successCb(user) {
      this.user = user;
      this.error = null;
    }
  }
