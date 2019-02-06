import {Component, OnInit} from '@angular/core';
import {GameService} from '../common/service/game.service';
import {GAME_EVENT, UNIT_STATUS} from '../common/types/game';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {

  public UNIT_STATUS = UNIT_STATUS;
  public isShowPopup = false;
  public roundIntervalInput;


  constructor(public gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.gameEvents$.subscribe((e: GAME_EVENT) => {
      console.log(e);
      if (e === GAME_EVENT.GAME_FINISHED) {
        this.isShowPopup = true;
      }
    });
  }


  startNewGame() {
    const options = {
      roundIntervalMS: this.roundIntervalInput * 1,
      xSize: 10,
      ySize: 10,
      winCount: 10
    };

    this.gameService.createNewGame(options);
  }

  closePopup() {
    this.isShowPopup = false;
  }
}
