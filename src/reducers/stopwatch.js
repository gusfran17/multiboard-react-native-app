import {
    UPDATE_TIME_LIMIT,
    UPDATE_ELAPSED_TIME,
    UPDATE_TIME_RUNNING,
    SAVE_PROGRESS,
    START_NEW_GAME,
    LOAD_GAME,
} from './../actions';

const initialState = {
    edited: false,
    time: '01:00',
    running: false,
    elapsedTime: 0,
};

const stopwatch = (state = initialState, action) => {
    switch(action.type) {
    case UPDATE_TIME_LIMIT:
        return {
            ...state,
            edited: true,
            time: action.time,
        }
    case UPDATE_ELAPSED_TIME:
        return {
            ...state,
            edited: true,
            elapsedTime: action.elapsedTime,
        }
    case UPDATE_TIME_RUNNING:
        return {
            ...state,
            edited: true,
            running: action.running,
        }
    case START_NEW_GAME:
        return {
            ...initialState,
            time: action.settings.time,
        };
    case SAVE_PROGRESS:
        return {
            ...state,
            edited: false,
        };
    case LOAD_GAME:
        return action.game.stopwatch;
    default:
        return state;
    }
}

export default stopwatch;
