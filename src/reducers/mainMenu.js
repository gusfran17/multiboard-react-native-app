import {
    UPDATE_NEW_GAME_WIN_OR_LOSE,
    UPDATE_NEW_GAME_MAX_SCORE,
    UPDATE_TIMED_NEW_GAME,
    UPDATE_TIME_LIMIT_NEW_GAME,
    START_NEW_GAME,
    SAVE_GAME,
    UPDATE_SAVED_GAME,
    REMOVE_GAME,
    LOAD_GAME,
} from './../actions';

const initialState = {
    maxScoreWins: true,
    maxScore: 10,
    activeGame: -1,
    savedGames: [],
    timed: false,
    time: '01:00',
}

const mainMenu = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_NEW_GAME_WIN_OR_LOSE:
        return ({
            ...state,
            maxScoreWins: action.maxScoreWins,
        });
    case UPDATE_NEW_GAME_MAX_SCORE:
        return ({
            ...state,
            maxScore: action.maxScore,
        });
    case UPDATE_TIMED_NEW_GAME:
        return ({
            ...state,
            timed: action.timed,
        });
    case UPDATE_TIME_LIMIT_NEW_GAME:
        return ({
            ...state,
            time: action.time,
        });
    case START_NEW_GAME:
        return {
            ...state,
            activeGame: -1,
        };
    case SAVE_GAME:
        return ({
            ...state,
            activeGame: state.savedGames.length,
            savedGames: [
                ...state.savedGames,
                action.game,
            ],
        });
    case UPDATE_SAVED_GAME:
        const savedGame = action.game;
        const savedGameCopy = {
            data: {
                ...savedGame.data,
            },
            players: [
                ...savedGame.players,
            ],
        };
        return {
            ...state,
            savedGames: [
                ...state.savedGames.slice(0,action.index),
                savedGameCopy,
                ...state.savedGames.slice(action.index+1),
            ],
        };
    case REMOVE_GAME:
        return {
            ...state,
            savedGames: [
                ...state.savedGames.slice(0,action.index),
                ...state.savedGames.slice(action.index+1),
            ],
        }
    case LOAD_GAME:
        return {
            ...state,
            activeGame: action.index,
        }
    default:
        return state;
    }
}

export default mainMenu;
