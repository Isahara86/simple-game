import {Injectable} from '@angular/core';
import {GAME_EVENT, IGameScore, UNIT_STATUS} from '../types/game';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public gameMap: UNIT_STATUS [] [];
  public drawingUnit: { x: number, y: number };
  public gameScore: IGameScore;
  private roundIntervalMS: number;
  private winCount: number;

  public gameEvents$ = new Subject<GAME_EVENT>();

  private roundTimeoutID;

  constructor() {
    this.gameMap = this.createNewGameMap(10, 10);  // 10 x 10 according to the technical task
    this.gameScore = {
      winner: null,
      userCount: 0,
      pcCount: 0,
    };
  }

  public createNewGame(options: { roundIntervalMS: number, xSize: number, ySize: number, winCount: number }) {
    this.gameMap = this.createNewGameMap(options.xSize, options.ySize);
    this.roundIntervalMS = options.roundIntervalMS;
    this.winCount = options.winCount;

    this.drawingUnit = null;
    this.gameScore = {
      winner: null,
      userCount: 0,
      pcCount: 0,
    };

    this.startNewRound();
  }

  private startNewRound() {
    this.calcNewRound(this.gameMap);

    this.gameEvents$.next(GAME_EVENT.NEW_ROUND);

    this.roundTimeoutID = setTimeout(() => {
      this.handlePlayerAction(this.drawingUnit.x, this.drawingUnit.y, UNIT_STATUS.PC);
    }, this.roundIntervalMS);
  }

  private createNewGameMap(x: number, y: number): UNIT_STATUS [] [] {
    const ar = [];

    for (let i = 0; i < x; i++) {
      ar.push(new Array(y).fill(UNIT_STATUS.FREE));
    }

    return ar;
  }

  public handlePlayerAction(x: number, y: number, player: UNIT_STATUS) {
    if (x !== this.drawingUnit.x || y !== this.drawingUnit.y) {
      return;
    }

    clearTimeout(this.roundTimeoutID);

    this.gameMap[x][y] = player;

    this.updateScore(player);

    this.gameScore.winner = this.checkWinner(this.gameScore, this.winCount);

    if (this.gameScore.winner) {
      this.gameEvents$.next(GAME_EVENT.GAME_FINISHED);
      return;
    }

    this.startNewRound();
  }

  private updateScore(player: UNIT_STATUS) {
    if (player === UNIT_STATUS.USER) {
      this.gameScore.userCount++;
    }
    if (player === UNIT_STATUS.PC) {
      this.gameScore.pcCount++;
    }
  }


  private calcNewRound(gameMap: UNIT_STATUS [] []) {
    const unitNum = gameMap.length * gameMap[0].length;
    const randomNum = Math.floor(Math.random() * unitNum) + 1;

    this.drawingUnit = this.getDrawUnit(randomNum, gameMap);
  }

  private getDrawUnit(num: number, gameMap: UNIT_STATUS [] []): { x: number, y: number } {
    let result;

    do {

      result = this.calcXY(num - 1, gameMap[0].length);
      num++;
      if (num >= (gameMap.length * gameMap[0].length)) {
        num = 0;
      }

    } while (gameMap[result.x][result.y] !== UNIT_STATUS.FREE);

    return result;
  }

  private calcXY(num: number, colSize: number): { x: number, y: number } {
    const x = Math.trunc(num / colSize);
    const y = num - (colSize * x);

    return {x, y};
  }

  private checkWinner(gameScore: IGameScore, winCount: number): UNIT_STATUS.USER | UNIT_STATUS.PC {
    if (gameScore.userCount >= winCount) {
      return UNIT_STATUS.USER;
    }

    if (gameScore.pcCount >= winCount) {
      return UNIT_STATUS.PC;
    }

    return null;
  }
}
