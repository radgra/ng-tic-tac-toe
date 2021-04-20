import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BoardComponent } from './main-page/board/board.component';
import { ScoreboardComponent } from './main-page/scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BoardComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
