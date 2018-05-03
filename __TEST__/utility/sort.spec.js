import { shallow, } from 'enzyme';
import * as React from 'react';
import { sortPlayersMaxScoreWins, sortPlayersMaxScoreLoses, } from './../../src/utility/sort';

const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const unfinishedPlayers = [
    {
        name: '15',
        score: 15,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
    {
        name: '50',
        score: 50,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
    {
        name: '10',
        score: 10,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
    {
        name: '5',
        score: 5,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
];

const finishedPlayers = [
    {
        name: '15',
        score: 15,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: addDays(new Date(),15),
    },
    {
        name: '50',
        score: 50,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: addDays(new Date(),50),
    },
    {
        name: '10',
        score: 10,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: addDays(new Date(),10),
    },
    {
        name: '5',
        score: 5,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: addDays(new Date(),5),
    },
];

const mixedPlayers = [
    {
        name: '11',
        score: 11,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: addDays(new Date(),11),
    },
    {
        name: '15',
        score: 15,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
    {
        name: '5',
        score: 5,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
    {
        name: '14',
        score: 14,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: addDays(new Date(),14),
    },
    {
        name: '10',
        score: 10,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: undefined,
    },
    {
        name: '51',
        score: 51,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: addDays(new Date(),51),
    },
    {
        name: '4',
        score: 4,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: addDays(new Date(),4),
    },
    {
        name: '50',
        score: 50,
        status: 'PLAYING',
        created: new Date(),
        updated: undefined,
        finished: undefined,
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
        console.log(sortedPlayers);
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
