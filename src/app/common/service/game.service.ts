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
  }

  public createNewGame(options: { roundIntervalMS: number, xSize: number, ySize: number, winCount: number }) {
    this.gameMap = this.createNewGameMap(options.xSize, options.ySize);
    this.roundIntervalMS = options.roundIntervalMS;
    this.winCount = options.winCount;

    this.drawingUnit = null;
    this.gameScore = null;

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

    this.gameScore = this.checkWinner(this.gameMap, this.winCount);

    if (this.gameScore) {
      this.gameEvents$.next(GAME_EVENT.GAME_FINISHED);
      return;
    }

    this.startNewRound();
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

  private checkWinner(gameMap: UNIT_STATUS [] [], winCount: number): IGameScore {
    let userCount = 0;
    let pcCount = 0;

    gameMap.forEach(col => {
      col.forEach(unit => {
        if (unit === UNIT_STATUS.USER) {
          userCount++;
        }
        if (unit === UNIT_STATUS.PC) {
          pcCount++;
        }
      });
    });

    if (userCount === winCount) {
      return {userCount, pcCount, winner: UNIT_STATUS.USER};
    }

    if (pcCount === winCount) {
      return{userCount, pcCount, winner: UNIT_STATUS.PC};
    }

    return null;
  }

  public getScore() {

  }

  private _getScore(gameMap: UNIT_STATUS [] []) {

  }
}
