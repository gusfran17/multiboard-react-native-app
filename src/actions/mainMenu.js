import { makeActionCreator, } from './../utility';

// SETTINGS
export const UPDATE_NEW_GAME_WIN_OR_LOSE = 'MainMenu/UPDATE_NEW_GAME_WIN_OR_LOSE';
export const UPDATE_NEW_GAME_MAX_SCORE = 'MainMenu/UPDATE_NEW_GAME_MAX_SCORE';
export const SAVE_GAME = 'MainMenu/SAVE_GAME';
export const UPDATE_SAVED_GAME = 'MainMenu/UPDATE_SAVED_GAME';
export const REMOVE_GAME = 'MainMenu/REMOVE_GAME';


export const updateNewGameWinOrLose = makeActionCreator(UPDATE_NEW_GAME_WIN_OR_LOSE, 'maxScoreWins');
export const updateNewGameMaxScore = makeActionCreator(UPDATE_NEW_GAME_MAX_SCORE, 'maxScore');
export const saveGame = makeActionCreator(SAVE_GAME, 'game');
export const updateSavedGame = makeActionCreator(UPDATE_SAVED_GAME, 'index', 'game');
export const removeGame = makeActionCreator(REMOVE_GAME, 'index');
