import { TBoard } from './../interfaces/board';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, merge, concat } from 'rxjs';
import {  distinctUntilChanged, map, share, toArray, filter, tap, take, finalize } from 'rxjs/operators';

export type TGameResult = 'X' | 'O' | 'draw' | 'notFinished'

export interface IPlayerMove {
  result?: TGameResult,
  nextMove?: 'X' | 'O',
  error?: string
}

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {
  result: TGameResult = 'notFinished'
  currentPlayer: 'X' | 'O' = 'X'
  private board: TBoard = [['', '', ''], ['', '', ''], ['', '', '']]

  // Board as Observable
  private _board$: BehaviorSubject<TBoard> = new BehaviorSubject(this.board)
  board$ = this._board$.asObservable().pipe(distinctUntilChanged())

  // Game State after player Move as observable
  private _playerMove$: BehaviorSubject<IPlayerMove> = new BehaviorSubject({nextMove:this.currentPlayer,result:this.result})
  playerMove$ = this._playerMove$.asObservable()

  constructor() { }

  makeMove(rowIndex, cellIndex) {
    const result = this.checkIfMoveValid(rowIndex, cellIndex)
    if (!result) {
      this._playerMove$.next({ error: 'Invalid Move' })
      return
    }

    this.board[rowIndex][cellIndex] = this.currentPlayer
    this.changePlayer()
    this._board$.next(this.board)

    this.isGameFinished().pipe(
      tap(data => {
        this.result = data.result as TGameResult
      }),
      finalize(() => this._playerMove$.next(this.getPlayerMoveState()))
      ).subscribe()
      
    }

  checkIfMoveValid(rowIndex, cellIndex) {
    if (this.board[rowIndex][cellIndex] !== '') return false

    return true
  }

  changePlayer() {
    if (this.currentPlayer === 'X') {
      this.currentPlayer = 'O'
    } else {
      this.currentPlayer = 'X'
    }
  }

  isGameFinished() {
    // 2. Check whether 3 columns are same     
    const rows$ = from(this.board).pipe(share())
    const rowsCheck = rows$
    const firstColumn = rows$.pipe(map(row => row[0]),toArray())
    const secondColumn = rows$.pipe(map(row => row[1]),toArray())
    const thirdColumn = rows$.pipe(map(row => row[2]),toArray())
    const firstDiagonal = rows$.pipe(map((row,index) => row[index]),toArray())
    const secondDiagonal = rows$.pipe(map((row,index) => row[2-index]),toArray())

    const win = merge(rowsCheck,firstColumn,secondColumn,thirdColumn,firstDiagonal,secondDiagonal).pipe(
      filter(row => row[0] !== ''),
      filter(row => (row[0] === row[1]) && (row[1] === row[2])), 
      map(row => { return {result:row[0]}}),
      take(1),
      // finalize(() => console.log('ended'))
    )

    // 4, Check whether there is a draw casue all players made moves
    const draw$ = rows$.pipe(
      filter(row => {
        return !row.some(el => el === '')}),
      filter((_ ,index) => index === 2),
      map(_ => {return {result:'draw'}})
    )

    return concat(win, draw$).pipe(
       take(1)
    )
  }


  private getPlayerMoveState(): IPlayerMove {
    return {
      result: this.result,
      nextMove: this.currentPlayer
    }
  }




}
