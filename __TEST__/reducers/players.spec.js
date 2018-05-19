
import { players, } from './../../src/reducers';
import {
    addPlayer,
    removePlayer,
    updateScore,
    updatePlayerStatus,
    updateWinOrLose,
    updateMaxScore,
    updateDisplayStats,
    updateGameStatus,
    startNewGame,
} from './../../src/actions';
import { PLAYING, WON, LOST, IN_COURSE, ENDED, } from './../../src/utility/constants';
import { compareStatesValid, } from './../compareStates';

let state;
describe('PLAYER REDUCER', () => {
    beforeEach(() => {
        state = {
            edited: false,
            players: [
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
            ],
        };
    });

    it('Add player should return 5 players', () => {
        console.log(addPlayer('Roberto'));
        const newState = players(state, addPlayer('Roberto'));
        const avoid = ['players', 'edited',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(5);
        expect(newState.edited).toBe(true);
        expect(newState.players[0].name).toBe('FRANCO');
        expect(newState.players[1].name).toBe('SANCHO');
        expect(newState.players[2].name).toBe('PANZA');
        expect(newState.players[3].name).toBe('SANTOS');
        expect(newState.players[4].name).toBe('ROBERTO');
    });

    it('Remove player should return 3 player', () => {
        const newState = players(state, removePlayer(0));
        const avoid = ['players', 'edited',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(3);
        expect(newState.edited).toBe(true);
        expect(newState.players[0].name).toBe('SANCHO');
    });

    it('Update player score to 5', () => {
        const newState = players(state, updateScore(0, 5));
        const avoid = ['players', 'edited',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(4);
        expect(newState.edited).toBe(true);
        expect(newState.players[0].score).toBe(5);
    });

    it('Update player score to -5', () => {
        const newState = players(state, updateScore(0, -5));
        const avoid = ['players', 'edited',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(4);
        expect(newState.edited).toBe(true);
        expect(newState.players[0].score).toBe(-5);
    });

    it('Update player status to WON', () => {
        const index = 3;
        const newState = players(state, updatePlayerStatus(index, WON));
        const avoid = ['players', 'edited',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(4);
        expect(newState.edited).toBe(true);
        expect(newState.players[index].status).toBe(WON);
    });

    it('Update player status to LOSE', () => {
        const index = 3;
        const newState = players(state, updatePlayerStatus(index, LOST));
        const avoid = ['players', 'edited',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(4);
        expect(newState.edited).toBe(true);
        expect(newState.players[index].status).toBe(LOST);
    });

    it('Update player status to PLAYING', () => {
        const index = 3;
        const newState = players(state, updatePlayerStatus(index, PLAYING));
        const avoid = ['players', 'edited',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(4);
        expect(newState.edited).toBe(true);
        expect(newState.players[index].status).toBe(PLAYING);
    });
});
