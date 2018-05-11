import { makeActionCreator, } from './../utility';

// PLAYERS
export const ADD_PLAYER = 'Player/ADD_PLAYER';
export const REMOVE_PLAYER = 'Player/REMOVE_PLAYER';
export const UPDATE_PLAYER_SCORE = 'Player/UPDATE_PLAYER_SCORE';
export const UPDATE_PLAYER_STATUS = 'Player/UPDATE_PLAYER_STATUS';
export const SELECT_PLAYER = 'Player/SELECT_PLAYER';

export const addPlayer = makeActionCreator(ADD_PLAYER, 'name');
export const removePlayer = makeActionCreator(REMOVE_PLAYER, 'index');
export const updateScore = makeActionCreator(UPDATE_PLAYER_SCORE, 'index', 'delta');
export const updatePlayerStatus = makeActionCreator(UPDATE_PLAYER_STATUS, 'index', 'status');
export const selectPlayer = makeActionCreator(SELECT_PLAYER, 'index');

// SETTINGS
export const UPDATE_WIN_OR_LOSE = 'Settings/UPDATE_WIN_OR_LOSE';
export const UPDATE_MAX_SCORE = 'Settings/UPDATE_MAX_SCORE';
export const UPDATE_DISPLAY_STATS = 'Settings/UPDATE_DISPLAY_STATS';
export const UPDATE_GAME_STATUS = 'Settings/UPDATE_GAME_STATUS';
export const START_NEW_GAME = 'Settings/START_NEW_GAME';
export const SAVE_PROGRESS = 'Settings/SAVE_PROGRESS';
export const LOAD_GAME = 'Settings/LOAD_GAME';
export const CHECK_GAME_STATUS = 'Settings/CHECK_GAME_STATUS';
export const UPDATE_TIMED_GAME = 'Settings/UPDATE_TIMED_GAME';
export const UPDATE_TIME_LIMIT = 'Settings/UPDATE_TIME_LIMIT';

export const updateWinOrLose = makeActionCreator(UPDATE_WIN_OR_LOSE, 'maxScoreWins');
export const updateMaxScore = makeActionCreator(UPDATE_MAX_SCORE, 'maxScore');
export const updateDisplayStats = makeActionCreator(UPDATE_DISPLAY_STATS, 'displayStats');
export const updateGameStatus = makeActionCreator(UPDATE_GAME_STATUS, 'gameStatus');
export const startNewGame = makeActionCreator(START_NEW_GAME, 'settings');
export const saveProgress = makeActionCreator(SAVE_PROGRESS, 'gameName');
export const loadGame = makeActionCreator(LOAD_GAME, 'game', 'index');
export const checkGameStatus = makeActionCreator(CHECK_GAME_STATUS, 'game');
export const updateTimedGame = makeActionCreator(UPDATE_TIMED_GAME, 'timed');
export const updateTimeLimit = makeActionCreator(UPDATE_TIME_LIMIT, 'time');
