import { TestBed } from '@angular/core/testing';

import { TicTacToeService } from './tic-tac-toe.service';

describe('TicTacToeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicTacToeService = TestBed.get(TicTacToeService);
    expect(service).toBeTruthy();
  });
  it('should correctly discover win by rows', (done) => {
    const service: TicTacToeService = TestBed.get(TicTacToeService);
    service['board'] = [['X', 'X', 'X'], ['', '', ''], ['', '', '']]
    service.isGameFinished().subscribe(result => {
      expect(result.result).toBe('X')
      done()
    })
  });
  it('should correctly discover win by columns', (done) => {
    const service: TicTacToeService = TestBed.get(TicTacToeService);
    service['board'] = [['', 'O', ''], ['', 'O', ''], ['', 'O', '']]
    service.isGameFinished().subscribe(result => {
      expect(result.result).toBe('O')
      done()
    })
  });
  it('should correctly discover win by diagonal', (done) => {
    const service: TicTacToeService = TestBed.get(TicTacToeService);
    service['board'] = [['', '', 'X'], ['', 'X', ''], ['X', '', '']]
    service.isGameFinished().subscribe(result => {
      expect(result.result).toBe('X')
      done()
    })
  });
  it('should correctly discover draw', (done) => {
    const service: TicTacToeService = TestBed.get(TicTacToeService);
    service['board'] = [['O', 'X', 'O'], ['O', 'X', 'O'], ['X', 'O', 'X']]
    service.isGameFinished().subscribe(result => {
      expect(result.result).toBe('draw')
      done()
    })
  });
  it('should complete but not emit', (done) => {
    const service: TicTacToeService = TestBed.get(TicTacToeService);
    service['board'] = [['X', 'X', ''], ['', '', ''], ['', '', '']]
    service.isGameFinished().subscribe(() => {}, () => {}, () => {
      expect(true).toBeTruthy()
      done()
    })
  });
});
