
import { game, } from './../../src/reducers';
import {
    updateWinOrLose,
    updateMaxScore,
    updateDisplayStats,
    updateGameStatus,
    startNewGame,
    selectPlayer,
} from './../../src/actions';
import { PLAYING, WON, LOST, IN_COURSE, ENDED, } from './../../src/utility/constants';
import { compareStatesValid, } from './../compareStates';

let state;
describe('GAME REDUCER', () => {
    beforeEach(() => {
        state = {
            selectedPlayer: -1,
            maxScoreWins: true,
            maxScore: 0,
            displayStats: false,
            gameStatus: IN_COURSE,
            gameName: '',
            edited: true,
            saved: undefined,
            timed: true,
        };
    });


    it('Update to win when reaching max score', () => {
        const newState = game(state, updateWinOrLose(true));
        const avoid = ['maxScoreWins', 'players', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.maxScoreWins).toBe(true);
        expect(newState.edited).toBe(true);
    });

    it('Update max score', () => {
        const maxScore = 222;
        const newState = game(game, updateMaxScore(maxScore));
        const avoid = ['maxScore', 'players', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.maxScore).toBe(maxScore);
        expect(newState.edited).toBe(true);
    });

    it('Update display stats', () => {
        const display = true;
        const newState = game(state, updateDisplayStats(display));
        const avoid = ['displayStats', 'players', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.displayStats).toBe(display);
        expect(newState.edited).toBe(true);
    });

    it('Update status', () => {
        const status = ENDED;
        const newState = game(state, updateGameStatus(status));
        const avoid = ['gameStatus', 'players', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.gameStatus).toBe(status);
        expect(newState.edited).toBe(true);
    });

    it('Start new game', () => {
        const maxScore = 123;
        const maxScoreWins = true;
        const timed = false;
        const newState = game(state, startNewGame({ timed, maxScore, maxScoreWins, }));
        expect(newState.gameStatus).toBe(IN_COURSE);
        expect(newState.maxScore).toBe(maxScore);
        expect(newState.maxScoreWins).toBe(maxScoreWins);
        expect(newState.selectedPlayer).toBe(-1);
        expect(newState.displayStats).toBe(false);
        expect(newState.edited).toBe(false);
    });

    it('Select player should change the selected player', () => {
        const index = 2;
        const newState = game(state, selectPlayer(index));
        const avoid = ['selectedPlayer', 'players', 'edited',];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.edited).toBe(true);
        expect(newState.selectedPlayer).toBe(index);
    })
});
