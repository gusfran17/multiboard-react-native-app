import {
    ADD_PLAYER,
    REMOVE_PLAYER,
    UPDATE_SCORE,
    UPDATE_PLAYER_STATUS,
    SELECT_PLAYER,
    UPDATE_WIN_OR_LOSE,
    UPDATE_MAX_SCORE,
    UPDATE_DISPLAY_STATS,
    UPDATE_GAME_STATUS,
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

const stubPlayers = [
    {
        name: 'FRANCO',
        score: 45,
        status: PLAYING,
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
    {
        name: 'SANCHO',
        score: 47,
        status: PLAYING,
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
    {
        name: 'PANZA',
        score: 47,
        status: PLAYING,
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
    {
        name: 'SANTOS',
        score: 50,
        status: PLAYING,
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
];

const emptyPlayers = [];

const initialState = {
    selectedPlayer: -1,
    maxScoreWins: true,
    maxScore: 0,
    displayStats: false,
    gameStatus: IN_COURSE,
    gameName: '',
    edited: false,
    saved: undefined,
    players: emptyPlayers,
};



const isValidPlayer = (name,players) => {
    let playerExists = false;
    for (let player of players) {
        if (player.name === name) {
            playerExists = true;
        }
    }
    if (name && !playerExists) {
        return true;
    }
    alert('Names should not be repeated or blank');
    return false;
};

const game = (state = initialState, action) => {
    switch(action.type) {
    case ADD_PLAYER:
        if (isValidPlayer(action.name, state.players))
            return {
                ...state,
                edited: true,
                players:[
                    ...state.players,
                    {
                        name: action.name.toUpperCase(),
                        score: 0,
                        status: PLAYING,
                        created: new Date(),
                        updated: undefined,
                        finished: undefined,
                    },
                ],
            };
        else return state;
    case REMOVE_PLAYER:
        return {
            ...state,
            edited: true,
            players: [
                ...state.players.slice(0, action.index),
                ...state.players.slice(action.index + 1),
            ],
        };
    case UPDATE_SCORE:
        const player = {
            name: state.players[action.index].name,
            score: state.players[action.index].score + action.delta,
            status: state.players[action.index].status,
            created: state.players[action.index].created,
            updated: new Date(),
            finished: state.players[action.index].finished,
        };
        return {
            ...state,
            edited: true,
            players: [
                ...state.players.slice(0, action.index),
                player,
                ...state.players.slice(action.index + 1),
            ],
        };
    case UPDATE_PLAYER_STATUS:
        const updatedPlayer = state.players[action.index];
        let newStatus = PLAYING;
        let newFinished = undefined;
        if (action.status === WON) {
            newStatus = WON;
            newFinished = new Date();
        }
        if (action.status === LOST) {
            newStatus = LOST;
            newFinished = new Date();
        }
        const insertPlayer = {
            name: updatedPlayer.name,
            score: updatedPlayer.score,
            status: newStatus,
            created: state.players[action.index].created,
            updated: state.players[action.index].updated,
            finished: newFinished,
        };
        return {
            ...state,
            edited: true,
            players: [
                ...state.players.slice(0, action.index),
                insertPlayer,
                ...state.players.slice(action.index + 1),
            ],
        };
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
        };
    case SAVE_PROGRESS:
        return {
            ...state,
            edited: false,
            saved: new Date(),
            gameName: action.gameName,
        };
    case LOAD_GAME:
        return action.game;
    default:
        return state;
    }
}

export default game;
