import { TBoard } from './../../interfaces/board';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export type TCellClicked = [number,number]

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board:TBoard
  @Output() cellClicked:EventEmitter<TCellClicked> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  onCellClicked(rowIndex,cellIndex) {
    // console.log(rowIndex, cellIndex)
    this.cellClicked.next([rowIndex,cellIndex])
  }

}

// check what current player is active x or y - every turn
// check if field is empty - if move allowed -every turn
// check if end of the game / every turn