import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER_SCORE, SET_PLAYERS_INITIAL_STATE, } from './../actions';

const initialState = {
    players: [],
};

const isValidPlayer = (name,players) => {
    let playerExists = false;
    for (let player in players) {
        if (player.name === name) {
            playerExists = true;
        }
    }
    if (name && !playerExists) {
        return true;
    }
    return false;
};

const playerReducer = (state= initialState.players, action) => {
    switch (action.type) {
    case ADD_PLAYER:
        const valid = isValidPlayer(action.name,state);
        if (valid) {
            return [
                ...state,
                {
                    name: action.name,
                    score: 0,
                },
            ];
        } else {
            return state;
        }
    case REMOVE_PLAYER:
        return [
            ...state.slice(0, action.index),
            ...state.slice(action.index + 1),
        ];
    case UPDATE_PLAYER_SCORE:
        const players = state.map((player,index) => {
            if (index === action.index) {
                return {
                    ...player,
                    score: player.score + action.score,
                };
            }
            return player;
        });
        return players;
    case SET_PLAYERS_INITIAL_STATE:
        return [
            ...action.players,
        ];
    default:
        return state;
    }
}

export default playerReducer;
