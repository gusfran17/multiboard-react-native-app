import { shallow, } from 'enzyme';
import * as React from 'react';
import { sortPlayersMaxScoreWins, sortPlayersMaxScoreLoses, sortSavedGames, } from './../../src/utility/sort';
import { addDays, unfinishedPlayers, finishedPlayers, mixedPlayers, } from './playersStub';


const savedGames = [
    {
        name: '15',
        data: {
            saved: addDays(new Date(),15),
        },
    },
    {
        name: '50',
        data: {
            saved: addDays(new Date(),50),
        },
    },
    {
        name: '10',
        data: {
            saved: addDays(new Date(),10),
        },
    },
    {
        name: '5',
        data: {
            saved: addDays(new Date(),5),
        },
    },
];

describe('Sort with max score wins setting', () => {
    it('should sort unfinished players', () => {
        const sortedPlayers = sortPlayersMaxScoreWins(unfinishedPlayers, true);
        expect(sortedPlayers[0].name).toBe('50');
        expect(sortedPlayers[sortedPlayers.length-1].name).toBe('5');
        expect(sortedPlayers.length).toBe(4);
    });

    it('should sort finished players', () => {
        const sortedPlayers = sortPlayersMaxScoreWins(finishedPlayers, true);
        expect(sortedPlayers[0].name).toBe('50');
        expect(sortedPlayers[sortedPlayers.length-1].name).toBe('5');
        expect(sortedPlayers.length).toBe(4);
    });

    it('should sort mixed players', () => {
        const sortedPlayers = sortPlayersMaxScoreWins(mixedPlayers, true);
        // First those with finished attribute defined
        expect(sortedPlayers[0].name).toBe('51');
        expect(sortedPlayers[3].name).toBe('14');
        expect(sortedPlayers[4].name).toBe('11');
        expect(sortedPlayers[sortedPlayers.length-1].name).toBe('4');
        expect(sortedPlayers.length).toBe(8);
    });
});

describe('Sort with max score losess setting', () => {
    it('should sort unfinished players', () => {
        const sortedPlayers = sortPlayersMaxScoreLoses(unfinishedPlayers, false);
        expect(sortedPlayers[0].name).toBe('5');
        expect(sortedPlayers[sortedPlayers.length-1].name).toBe('50');
        expect(sortedPlayers.length).toBe(4);
    });

    it('should sort finished players', () => {
        const sortedPlayers = sortPlayersMaxScoreLoses(finishedPlayers, false);
        expect(sortedPlayers[0].name).toBe('50');
        expect(sortedPlayers[sortedPlayers.length-1].name).toBe('5');
        expect(sortedPlayers.length).toBe(4);
    });

    it('should sort mixed players', () => {
        const sortedPlayers = sortPlayersMaxScoreLoses(mixedPlayers, false);
        // First those with finished attribute undefined
        expect(sortedPlayers[0].name).toBe('5');
        expect(sortedPlayers[3].name).toBe('50');
        // Second those with finished attribute defined
        expect(sortedPlayers[4].name).toBe('51');
        expect(sortedPlayers[sortedPlayers.length-1].name).toBe('4');
        expect(sortedPlayers.length).toBe(8);
    });
});

describe('Sort saved games', () => {
    it('should sort saved games descendant order', () => {
        const sortedSavedGames = sortSavedGames(savedGames);
        expect(sortedSavedGames[0].name).toBe('50');
        expect(sortedSavedGames[savedGames.length-1].name).toBe('5');
        expect(sortedSavedGames.length).toBe(4);
    });
});
