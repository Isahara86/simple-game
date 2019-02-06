import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScreenComponent } from './game-screen.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {PopupGameResultComponent} from '../popup-game-result/popup-game-result.component';
import {ScoreComponent} from '../score/score.component';

describe('GameScreenComponent', () => {
  let component: GameScreenComponent;
  let fixture: ComponentFixture<GameScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameScreenComponent,
        PopupGameResultComponent,
        ScoreComponent,
      ],
      imports: [
        FormsModule,
        MatButtonModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
