import { makeActionCreator, } from './../utility';

// PLAYERS
export const ADD_PLAYER = 'Player/ADD_PLAYER';
export const REMOVE_PLAYER = 'Player/REMOVE_PLAYER';
export const UPDATE_PLAYER_SCORE = 'Player/UPDATE_PLAYER_SCORE';
export const UPDATE_PLAYER_STATUS = 'Player/UPDATE_PLAYER_STATUS';
export const SELECT_PLAYER = 'Player/SELECT_PLAYER';
export const UPDATE_PLAYER_ELAPSED_TIME = 'Player/UPDATE_PLAYER_ELAPSED_TIME';

export const addPlayer = makeActionCreator(ADD_PLAYER, 'name');
export const removePlayer = makeActionCreator(REMOVE_PLAYER, 'index');
export const updateScore = makeActionCreator(UPDATE_PLAYER_SCORE, 'index', 'delta');
export const updatePlayerStatus = makeActionCreator(UPDATE_PLAYER_STATUS, 'index', 'status', 'elpasedTime');
export const selectPlayer = makeActionCreator(SELECT_PLAYER, 'index');
export const updatePlayerElapsedTime = makeActionCreator(UPDATE_PLAYER_ELAPSED_TIME, 'index', 'elapsedTime');
