export const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}


export const unfinishedPlayers = [
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

export const finishedPlayers = [
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

export const mixedPlayers = [
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
