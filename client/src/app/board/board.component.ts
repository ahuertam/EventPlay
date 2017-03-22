import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  user:any;
  constructor(public session: SessionService) {
    this.session.getLoginEvetEmitter()
      .subscribe((user) => this.user=user);
     }

  ngOnInit() {
  }

}
