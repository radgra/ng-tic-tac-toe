import { TCellClicked } from './board/board.component';
import { TBoard } from './../interfaces/board';
import { TicTacToeService, IPlayerMove, TGameResult } from './../services/tic-tac-toe.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  board$: Observable<TBoard>
  gameResult:TGameResult = "notFinished"
  playerValidMove$:Observable<IPlayerMove>
  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit() {
    this.board$ = this.ticTacToeService.board$
    // Error logging
    this.ticTacToeService.playerMove$.pipe(
      filter((move:IPlayerMove) => move.error ? true : false)
    ).subscribe(console.log)

    this.playerValidMove$ = this.ticTacToeService.playerMove$.pipe(
      tap(console.log),
      filter((move:IPlayerMove) => !!move.result),
      tap(move => this.gameResult = move.result)
      )
  }

  onCellClicked([rowIndex, cellIndex]: TCellClicked) {
    if(this.gameResult !== 'notFinished') return
    this.ticTacToeService.makeMove(rowIndex, cellIndex)
  }

}
