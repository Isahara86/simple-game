import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PopupGameResultComponent} from './popup-game-result.component';
import {GameService} from '../common/service/game.service';
import {IGameScore, UNIT_STATUS} from '../common/types/game';
import {ScoreComponent} from '../score/score.component';

describe('PopupGameResultComponent', () => {
  let component: PopupGameResultComponent;
  let fixture: ComponentFixture<PopupGameResultComponent>;
  let gameService: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupGameResultComponent, ScoreComponent],
      providers: [
        {provide: GameService, useClass: MockGameService}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupGameResultComponent);
    component = fixture.componentInstance;
    gameService = TestBed.get(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockGameService {
  public gameScore: IGameScore = {
    pcCount: 0,
    userCount: 0,
    winner: UNIT_STATUS.USER,
  };
}
