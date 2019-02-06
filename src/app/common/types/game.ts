export enum UNIT_STATUS {
  FREE = 'FREE',
  PC = 'PC',
  USER = 'USER',
}

export enum GAME_EVENT {
  NEW_ROUND = 'NEW_ROUND',
  GAME_FINISHED = 'GAME_FINISHED',
}

export interface IGameScore {
  userCount: number;
  pcCount: number;
  winner: UNIT_STATUS.USER | UNIT_STATUS.PC;
}
