import {
    updateTimeLimit,
    updateElapsedTime,
    updateTimeRunning,
    saveProgress,
    startNewGame,
    loadGame,
} from './../../src/actions';
import { compareStatesValid, } from './../compareStates';
import { stopwatch, } from './../../src/reducers';


let state;
describe('STOPWATCH REDUCER', () => {
    beforeEach(() => {
        state = {
            edited: false,
            time: '01:00',
            running: false,
            elapsedTime: 0,
        };
    });


    it('Update time limit', () => {
        const newState = stopwatch(state, updateTimeLimit('10:00'));
        const avoid = ['time', 'edited', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.time).toBe('10:00');
        expect(newState.edited).toBe(true);
    });

    it('Update elapsed limit', () => {
        const newState = stopwatch(state, updateElapsedTime(1234));
        const avoid = ['elapsedTime', 'edited', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.elapsedTime).toBe(1234);
        expect(newState.edited).toBe(true);
    });

    it('Set time running', () => {
        const newState = stopwatch(state, updateTimeRunning(true));
        const avoid = ['running', 'edited', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.running).toBe(true);
        expect(newState.edited).toBe(true);
    });

    it('Set time when start new game', () => {
        const newState = stopwatch(state, startNewGame({time: '22:22',}));
        const avoid = ['time', 'edited', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.time).toBe('22:22');
        expect(newState.edited).toBe(false);
    });

    it('Save progress edited is false', () => {
        const newState = stopwatch(state, saveProgress());
        const avoid = ['edited', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.edited).toBe(false);
    });

    it('load game loads stopwatch', () => {
        const newState = stopwatch(state, loadGame({ stopwatch: {
            edited: false,
            time: '20:00',
            running: true,
            elapsedTime: 1000,
        },
        }));
        expect(newState.edited).toBe(false);
        expect(newState.time).toBe('20:00');
        expect(newState.running).toBe(true);
        expect(newState.elapsedTime).toBe(1000);
    });
});
