//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//end Modules

///Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EventComponent } from './event/event.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TournamentComponent } from './tournament/tournament.component';
import { BoardComponent } from './board/board.component';
///END Components

//Routes
import { Routes,RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
export const routes: Routes = [
    { path: '', component: BoardComponent },
    { path: 'event/:id', component: EventComponent },
    { path: '**', redirectTo: '' }
];
//End Routes

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventComponent,
    LeaderboardComponent,
    TournamentComponent,
    BoardComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
