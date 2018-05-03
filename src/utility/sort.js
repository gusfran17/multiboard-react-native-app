export const sortPlayersMaxScoreWins = players => {
    const compare = (player1, player2) => {
        if (player1.score > player2.score) {
            return -1;
        } else if (player1.score < player2.score) {
            return 1;
        }
        return 0;
    }
    const sortedPlayers = players.slice().sort(compare);
    return sortedPlayers;
}

export const sortPlayersMaxScoreLoses = players => {
    const compareFinished = (player1, player2) => {
        if (player1.finished > player2.finished) {
            return -1;
        } else if (player1.finished < player2.finished) {
            return 1;
        }
        return 0;
    }

    const compareUnfinished = (player1, player2) => {
        if (player1.score > player2.score) {
            return 1;
        } else if (player1.score < player2.score) {
            return -1;
        }
        return 0;
    }

    const unfinishedPlayers = players.slice().filter(player => {
        if (!player.finished) return true;
    })
    const sortedUnfinished = unfinishedPlayers.sort(compareUnfinished);

    const finishedPlayers = players.slice().filter(player => {
        if (player.finished) return true;
    })
    const sortedFinished = finishedPlayers.sort(compareFinished);

    return [
        ...sortedUnfinished,
        ...sortedFinished,
    ];
}
