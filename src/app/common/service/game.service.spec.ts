import {TestBed} from '@angular/core/testing';

import {GameService} from './game.service';
import {GAME_EVENT, UNIT_STATUS} from '../types/game';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });
});

describe('Create new game map', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created 1x1', () => {
    const service: GameService = TestBed.get(GameService);
    const expectResult = [[UNIT_STATUS.FREE]];

    const actualResult = service['createNewGameMap' as any](1, 1);
    expect(actualResult).toEqual(expectResult);
  });

  it('should be created 2x2', () => {
    const service: GameService = TestBed.get(GameService);
    const expectResult = [
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE],
    ];

    const actualResult = service['createNewGameMap' as any](2, 2);
    expect(actualResult).toEqual(expectResult);
  });

  it('should be created 2x5', () => {
    const service: GameService = TestBed.get(GameService);
    const expectResult = [
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE],
    ];

    const actualResult = service['createNewGameMap' as any](2, 5);
    expect(actualResult).toEqual(expectResult);
  });

  it('should be created 5x5', () => {
    const service: GameService = TestBed.get(GameService);
    const expectResult = [
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE, UNIT_STATUS.FREE],
    ];

    const actualResult = service['createNewGameMap' as any](5, 5);
    expect(actualResult).toEqual(expectResult);
  });
});

describe('getDrawUnit', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should return  0 0', () => {
    const service: GameService = TestBed.get(GameService);
    const testGameMap = [
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE],
    ];
    expect(service['getDrawUnit' as any](1, testGameMap)).toEqual({x: 0, y: 0});
  });

  it('should return  1 0', () => {
    const service: GameService = TestBed.get(GameService);
    const testGameMap = [
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE],
    ];
    expect(service['getDrawUnit' as any](3, testGameMap)).toEqual({x: 1, y: 0});
  });

  it('should return  0 1', () => {
    const service: GameService = TestBed.get(GameService);
    const testGameMap = [
      [UNIT_STATUS.PC, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE],
    ];
    expect(service['getDrawUnit' as any](0, testGameMap)).toEqual({x: 0, y: 1});
  });

  it('should return  1 0', () => {
    const service: GameService = TestBed.get(GameService);
    const testGameMap = [
      [UNIT_STATUS.PC, UNIT_STATUS.USER],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.PC],
    ];
    expect(service['getDrawUnit' as any](0, testGameMap)).toEqual({x: 1, y: 0});
  });
});

describe('calcXY', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should return  0 0', () => {
    const service: GameService = TestBed.get(GameService);

    expect(service['calcXY' as any](0, 2)).toEqual({x: 0, y: 0});
  });

  it('should return  0 1', () => {
    const service: GameService = TestBed.get(GameService);

    expect(service['calcXY' as any](1, 2)).toEqual({x: 0, y: 1});
  });

  it('should return  1 0', () => {
    const service: GameService = TestBed.get(GameService);

    expect(service['calcXY' as any](2, 2)).toEqual({x: 1, y: 0});
  });

  it('should return  1 1', () => {
    const service: GameService = TestBed.get(GameService);

    expect(service['calcXY' as any](3, 2)).toEqual({x: 1, y: 1});
  });

  it('should return  0 2', () => {
    const service: GameService = TestBed.get(GameService);

    expect(service['calcXY' as any](2, 3)).toEqual({x: 0, y: 2});
  });

  it('should return  1 0', () => {
    const service: GameService = TestBed.get(GameService);

    expect(service['calcXY' as any](2, 2)).toEqual({x: 1, y: 0});
  });

  it('should return  2 2', () => {
    const service: GameService = TestBed.get(GameService);

    expect(service['calcXY' as any](8, 3)).toEqual({x: 2, y: 2});
  });

});

describe('checkWinner', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should return null', () => {
    const service: GameService = TestBed.get(GameService);
    const testGameMap = [
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE],
      [UNIT_STATUS.FREE, UNIT_STATUS.FREE],
    ];

    const winCount = 2;

    expect(service['checkWinner' as any](testGameMap, winCount)).toEqual(null);
  });

  it('should return null', () => {
    const service: GameService = TestBed.get(GameService);
    const testGameMap = [
      [UNIT_STATUS.FREE, UNIT_STATUS.USER],
      [UNIT_STATUS.FREE, UNIT_STATUS.PC],
    ];

    const winCount = 2;

    expect(service['checkWinner' as any](testGameMap, winCount)).toEqual(null);
  });

  it('should return UNIT_STATUS.PC', () => {
    const service: GameService = TestBed.get(GameService);
    const testGameMap = [
      [UNIT_STATUS.PC, UNIT_STATUS.USER],
      [UNIT_STATUS.FREE, UNIT_STATUS.PC],
      [UNIT_STATUS.FREE, UNIT_STATUS.PC],
    ];

    const winCount = 3;

    expect(service['checkWinner' as any](testGameMap, winCount)).toEqual({ userCount: 1, pcCount: 3, winner: UNIT_STATUS.PC });
  });

  it('should return UNIT_STATUS.USER', () => {
    const service: GameService = TestBed.get(GameService);
    const testGameMap = [
      [UNIT_STATUS.PC, UNIT_STATUS.USER],
      [UNIT_STATUS.FREE, UNIT_STATUS.USER],
      [UNIT_STATUS.FREE, UNIT_STATUS.USER],
    ];

    const winCount = 3;

    expect(service['checkWinner' as any](testGameMap, winCount)).toEqual({ userCount: 3, pcCount: 1, winner: UNIT_STATUS.USER });
  });
});

describe('game process test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should win User', () => {
    const service: GameService = TestBed.get(GameService);
    const options = {
      roundIntervalMS: 1000,
      xSize: 3,
      ySize: 3,
      winCount: 2
    };

    service.createNewGame(options);

    for (let i = 0; i < 2; i++) {
      const drawingUnit = service.drawingUnit;
      service.handlePlayerAction(drawingUnit.x, drawingUnit.y, UNIT_STATUS.USER);
    }

    expect(service.gameScore).toEqual({userCount: 2, pcCount: 0, winner: UNIT_STATUS.USER});
  });

  it('should win PC', (done) => {
    const service: GameService = TestBed.get(GameService);
    const options = {
      roundIntervalMS: 100,
      xSize: 3,
      ySize: 3,
      winCount: 2
    };

    let failTimeout;

    const sub = service.gameEvents$.subscribe((e: GAME_EVENT) => {
      if (e === GAME_EVENT.GAME_FINISHED) {
        clearTimeout(failTimeout);
        sub.unsubscribe();
        expect(service.gameScore).toEqual({userCount: 0, pcCount: 2, winner: UNIT_STATUS.PC});
        done();
      }
    });

    failTimeout = setTimeout(() => done.fail(), 1000);

    service.createNewGame(options);
  });

  it('should win PC', (done) => {
    const service: GameService = TestBed.get(GameService);
    const options = {
      roundIntervalMS: 100,
      xSize: 3,
      ySize: 3,
      winCount: 3
    };

    let failTimeout;

    const sub = service.gameEvents$.subscribe((e: GAME_EVENT) => {
      if (e === GAME_EVENT.GAME_FINISHED) {
        clearTimeout(failTimeout);
        sub.unsubscribe();
        expect(service.gameScore).toEqual({userCount: 0, pcCount: 3, winner: UNIT_STATUS.PC});
        done();
      }
    });

    failTimeout = setTimeout(() => done.fail(), 1000);

    service.createNewGame(options);
  });

  it('should win USER', (done) => {
    const service: GameService = TestBed.get(GameService);
    const options = {
      roundIntervalMS: 100,
      xSize: 3,
      ySize: 3,
      winCount: 3
    };

    let failTimeout;

    const sub = service.gameEvents$.subscribe((e: GAME_EVENT) => {
      if (e === GAME_EVENT.GAME_FINISHED) {
        clearTimeout(failTimeout);
        sub.unsubscribe();
        expect(service.gameScore).toEqual({userCount: 3, pcCount: 2, winner: UNIT_STATUS.USER});
        done();
      }
    });

    failTimeout = setTimeout(() => done.fail(), 1000);


    service.createNewGame(options);

    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        const drawingUnit = service.drawingUnit;
        service.handlePlayerAction(drawingUnit.x, drawingUnit.y, UNIT_STATUS.USER);
      }
    }, 290);
  });

});
