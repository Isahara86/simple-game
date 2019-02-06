import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from '../common/service/game.service';
import {UNIT_STATUS} from '../common/types/game';

@Component({
  selector: 'app-popup-game-result',
  templateUrl: './popup-game-result.component.html',
  styleUrls: ['./popup-game-result.component.scss']
})
export class PopupGameResultComponent implements OnInit {

  public UNIT_STATUS = UNIT_STATUS;

  @Output() close = new EventEmitter<void>();

  constructor(public gameService: GameService) { }

  ngOnInit() {
  }

}
