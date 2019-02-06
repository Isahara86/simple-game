import { Component, OnInit } from '@angular/core';
import {GameService} from '../common/service/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit() {
  }

}
