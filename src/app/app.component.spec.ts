import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {GameScreenComponent} from './game-screen/game-screen.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {PopupGameResultComponent} from './popup-game-result/popup-game-result.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameScreenComponent,
        PopupGameResultComponent,
      ],
      imports: [
        FormsModule,
        MatButtonModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'task'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('task');
  });
});
