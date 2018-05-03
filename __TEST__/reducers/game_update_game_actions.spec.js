
import { game, } from './../../src/reducers';
import {
    updateWinOrLose,
    updateMaxScore,
    updateDisplayStats,
    updateGameStatus,
    startNewGame,
} from './../../src/actions';
import { PLAYING, WON, LOST, IN_COURSE, ENDED, } from './../../src/utility/constants';
import { compareStatesValid, } from './../compareStates';

let state;
describe('GAME REDUCER game update actions', () => {
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


    it('Update game to win when reaching max score', () => {
        const newState = game(state.game, updateWinOrLose(true));
        const avoid = ['maxScoreWins', 'players', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.maxScoreWins).toBe(true);
    });

    it('Update game max score', () => {
        const maxScore = 222;
        const newState = game(state.game, updateMaxScore(maxScore));
        const avoid = ['maxScore', 'players', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.maxScore).toBe(maxScore);
    });

    it('Update game display stats', () => {
        const display = true;
        const newState = game(state.game, updateDisplayStats(display));
        const avoid = ['displayStats', 'players', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.displayStats).toBe(display);
    });

    it('Update game game status', () => {
        const status = ENDED;
        const newState = game(state.game, updateGameStatus(status));
        const avoid = ['gameStatus', 'players', ];
        expect(compareStatesValid(state, newState, avoid)).toBe(true);
        expect(newState.gameStatus).toBe(status);
    });

    it('Update game game status', () => {
        const maxScore = 123;
        const maxScoreWins = true;
        const newState = game(state.game, startNewGame({ maxScore, maxScoreWins, }));
        expect(newState.gameStatus).toBe(IN_COURSE);
        expect(newState.players.length).toBe(0);
        expect(newState.maxScore).toBe(maxScore);
        expect(newState.maxScoreWins).toBe(maxScoreWins);
        expect(newState.selectedPlayer).toBe(-1);
        expect(newState.displayStats).toBe(false);
    });
});
