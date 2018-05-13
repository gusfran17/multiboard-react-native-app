import {
    ADD_PLAYER,
    REMOVE_PLAYER,
    UPDATE_PLAYER_SCORE,
    UPDATE_PLAYER_STATUS,
    UPDATE_PLAYER_ELAPSED_TIME,
    START_NEW_GAME,
    SAVE_PROGRESS,
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
        elpasedTime: undefined,
    },
    {
        name: 'SANCHO',
        score: 47,
        status: PLAYING,
        created: new Date(),
        updated: undefined,
        finished: undefined,
        elpasedTime: undefined,
    },
    {
        name: 'PANZA',
        score: 47,
        status: PLAYING,
        created: new Date(),
        updated: undefined,
        finished: undefined,
        elpasedTime: undefined,
    },
    {
        name: 'SANTOS',
        score: 50,
        status: PLAYING,
        created: new Date(),
        updated: undefined,
        finished: undefined,
        elpasedTime: undefined,
    },
];

const emptyPlayers = [];

const initialState = {
    edited: false,
    players: emptyPlayers,
};

const gamePlayers = (state = initialState, action) => {
    switch(action.type) {
    case ADD_PLAYER:
        return {
            edited: true,
            players:[
                ...state.players,
                {
                    name: action.name.trim().toUpperCase(),
                    score: 0,
                    status: PLAYING,
                    created: new Date(),
                    updated: undefined,
                    finished: undefined,
                    elpasedTime: undefined,
                },
            ],
        };
    case REMOVE_PLAYER:
        return {
            edited: true,
            players: [
                ...state.players.slice(0, action.index),
                ...state.players.slice(action.index + 1),
            ],
        };
    case UPDATE_PLAYER_SCORE:
        const player = {
            ...state.players[action.index],
            score: action.delta,
            updated: new Date(),
        };
        return {
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
        console.log(action);
        const insertPlayer = {
            ...updatedPlayer,
            status: newStatus,
            finished: newFinished,
            elapsedTime: action.elapsedTime,
        };
        return {
            edited: true,
            players: [
                ...state.players.slice(0, action.index),
                insertPlayer,
                ...state.players.slice(action.index + 1),
            ],
        };
    case UPDATE_PLAYER_ELAPSED_TIME:
        const updatedPlayerET = {
            ...state.players[action.index],
            elapsedTime: action.elapsedTime,
        };
        return {
            edited: true,
            players: [
                ...state.players.slice(0, action.index),
                updatedPlayerET,
                ...state.players.slice(action.index + 1),
            ],
        };
    case START_NEW_GAME:
        return {
            edited: false,
            players: [],
        };
    case SAVE_PROGRESS:
        return {
            ...state,
            edited: false,
        };
    case LOAD_GAME:
        return {
            edited: false,
            players: action.game.players,
        };
    default:
        return state;
    }
}

export default gamePlayers;
