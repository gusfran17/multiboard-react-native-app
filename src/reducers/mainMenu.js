import {
    UPDATE_NEW_GAME_WIN_OR_LOSE,
    UPDATE_NEW_GAME_MAX_SCORE,
    START_NEW_GAME,
    SAVE_GAME,
    UPDATE_GAME,
    REMOVE_GAME,
} from './../actions';

const initialState = {
    maxScoreWins: true,
    maxScore: 100,
    activeGame: -1,
    savedGames: [],
}

const isValidGame = (name,games) => {
    console.log(name, games);
    let gameExists = false;
    for (let game of games) {
        console.log(game);
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
            maxScoreWins: action.maxScoreWins,
            maxScore: state.maxScore,
            activeGame: state.activeGame,
            savedGames: state.savedGames,
        });
    case UPDATE_NEW_GAME_MAX_SCORE:
        return ({
            maxScoreWins: state.maxScoreWins,
            maxScore: action.maxScore,
            activeGame: state.activeGame,
            savedGames: state.savedGames,
        });
    case START_NEW_GAME:
        return {
            ...state,
            activeGame: -1,
        };
    case SAVE_GAME:
        return ({
            maxScoreWins: state.maxScoreWins,
            maxScore: state.maxScore,
            activeGame: state.savedGames.length,
            savedGames: [
                ...state.savedGames,
                action.game,
            ],
        });
    case UPDATE_GAME:
        const savedGame = action.game;
        return {
            maxScoreWins: state.maxScoreWins,
            maxScore: state.maxScore,
            activeGame: state.activeGame,
            savedGames: [
                ...state.savedGames.slice(0,action.index),
                savedGame,
                ...state.savedGames.slice(action.index+1),
            ],
        }

    case REMOVE_GAME:
        return {
            maxScoreWins: state.maxScoreWins,
            maxScore: state.maxScore,
            activeGame: state.activeGame,
            savedGames: [
                state.savedGames.slice(0,action.index),
                state.savedGames.slice(action.index+1),
            ],
        }
    default:
        return state;
    }
}

export default mainMenu;
