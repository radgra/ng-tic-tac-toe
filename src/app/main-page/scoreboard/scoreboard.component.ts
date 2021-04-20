import { TGameResult } from './../../services/tic-tac-toe.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  @Input() gameResult:TGameResult
  @Input() nextMove: string;
  constructor() { }

  ngOnInit() {
  }

}
