
import { game, } from './../../src/reducers';
import {
    addPlayer,
    removePlayer,
    updateScore,
    updatePlayerStatus,
    selectPlayer,
    updateWinOrLose,
    updateMaxScore,
    updateDisplayStats,
    updateGameStatus,
    startNewGame,
} from './../../src/actions';
import { PLAYING, WON, LOST, IN_COURSE, ENDED, } from './../../src/utility/constants';
import { compareStatesValid, } from './../compareStates';

let state;
describe('GAME REDUCER Add Remove Update player', () => {
    beforeEach(() => {
        state = {
            selectedPlayer: -1,
            maxScoreWins: true,
            maxScore: 51,
            displayStats: false,
            gameStatus: IN_COURSE,
            gameName: '',
            activeGame: 2,
            edited: true,
            saved: undefined,
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
        const newState = game(state.game, addPlayer('Roberto'));
        const avoid = ['players',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(5);
        expect(newState.players[0].name).toBe('FRANCO');
        expect(newState.players[1].name).toBe('SANCHO');
        expect(newState.players[2].name).toBe('PANZA');
        expect(newState.players[3].name).toBe('SANTOS');
        expect(newState.players[4].name).toBe('ROBERTO');
    });

    it('Remove player should return 3 player', () => {
        const newState = game(state.game, removePlayer(0));
        const avoid = ['players',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(3);
        expect(newState.players[0].name).toBe('SANCHO');
    });

    it('Update player score by 5', () => {
        const newState = game(state.game, updateScore(0, 5));
        const avoid = ['players',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(4);
        expect(newState.players[0].score).toBe(50);
    });

    it('Update player score by -5', () => {
        const newState = game(state.game, updateScore(0, -5));
        const avoid = ['players',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(4);
        expect(newState.players[0].score).toBe(40);
    });

    it('Update player status to WON', () => {
        const index = 3;
        const newState = game(state.game, updatePlayerStatus(index, WON));
        const avoid = ['players',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(4);
        expect(newState.players[index].status).toBe(WON);
    });

    it('Update player status to LOSE', () => {
        const index = 3;
        const newState = game(state.game, updatePlayerStatus(index, LOST));
        const avoid = ['players',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(4);
        expect(newState.players[index].status).toBe(LOST);
    });

    it('Update player status to PLAYING', () => {
        const index = 3;
        const newState = game(state.game, updatePlayerStatus(index, PLAYING));
        const avoid = ['players',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.players.length).toBe(4);
        expect(newState.players[index].status).toBe(PLAYING);
    });

    it('Select player should change the selected player', () => {
        const index = 2;
        const newState = game(state.game, selectPlayer(index));
        const avoid = ['selectedPlayer', 'players', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.selectedPlayer).toBe(index);
    })
});
