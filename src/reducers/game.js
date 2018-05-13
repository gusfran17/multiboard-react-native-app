import {
    SELECT_PLAYER,
    UPDATE_WIN_OR_LOSE,
    UPDATE_MAX_SCORE,
    UPDATE_DISPLAY_STATS,
    UPDATE_GAME_STATUS,
    UPDATE_TIMED_GAME,
    START_NEW_GAME,
    SAVE_PROGRESS,
    UPDATE_GAME_NAME,
    LOAD_GAME,
} from './../actions';

import {
    PLAYING,
    WON,
    LOST,
    IN_COURSE,
    ENDED,
} from './../utility/constants';

const initialState = {
    selectedPlayer: -1,
    maxScoreWins: true,
    maxScore: 0,
    displayStats: false,
    gameStatus: IN_COURSE,
    gameName: '',
    edited: false,
    saved: undefined,
    timed: false,
};

const game = (state = initialState, action) => {
    switch(action.type) {
    case SELECT_PLAYER:
        return {
            ...state,
            selectedPlayer: action.index,
            edited: true,
        };
    case UPDATE_WIN_OR_LOSE:
        return {
            ...state,
            edited: true,
            maxScoreWins: action.maxScoreWins,
        };
    case UPDATE_MAX_SCORE:
        return {
            ...state,
            edited: true,
            maxScore: action.maxScore,
        };
    case UPDATE_TIMED_GAME:
        return {
            ...state,
            edited: true,
            timed: action.timed,
        }
    case UPDATE_DISPLAY_STATS:
        return {
            ...state,
            edited: true,
            displayStats: action.displayStats,
        };
    case UPDATE_GAME_STATUS:
        return {
            ...state,
            edited: true,
            gameStatus: action.gameStatus,
        };
    case START_NEW_GAME:
        return {
            ...initialState,
            maxScoreWins: action.settings.maxScoreWins,
            maxScore: action.settings.maxScore,
            timed: action.settings.timed,
        };
    case SAVE_PROGRESS:
        return {
            ...state,
            edited: false,
            saved: new Date(),
            gameName: action.gameName,
        };
    case LOAD_GAME:
        return action.game.data;
    default:
        return state;
    }
}

export default game;
