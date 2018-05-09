import {
    UPDATE_NEW_GAME_WIN_OR_LOSE,
    UPDATE_NEW_GAME_MAX_SCORE,
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
}

const isValidGame = (name,games) => {
    let gameExists = false;
    for (let game of games) {
        if (game.gameName === name) {
            gameExists = true;
        }
    }
    if (name && !gameExists) {
        return true;
    }
    alert('There is an existing game with that name. Names should not be repeated or blank');
    return false;
};

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
    case START_NEW_GAME:
        return {
            ...state,
            activeGame: -1,
        };
    case SAVE_GAME:
        console.log(action.game);
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
        console.log(savedGame);
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
