export const sortPlayersMaxScoreWins = players => {
    const compare = (player1, player2) => {
        if (player1.score > player2.score) {
            return -1;
        } else if (player1.score < player2.score) {
            return 1;
        }
        const p1Finished = new Date(player1.finished);
        const p2Finished = new Date(player2.finished);
        if (p1Finished && p2Finished) {
            if (p1Finished < p2Finished) {
                return -1;
            } else if (p1Finished > p2Finished) {
                return 1;
            }
        }
        return 0;
    }
    const sortedPlayers = players.slice().sort(compare);
    return sortedPlayers;
}

export const sortPlayersMaxScoreLoses = players => {
    const compareFinished = (player1, player2) => {
        const p1Finished = new Date(player1.finished);
        const p2Finished = new Date(player2.finished);
        if (p1Finished > p2Finished) {
            return -1;
        } else if (p1Finished < p2Finished) {
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

export const sortSavedGames = savedGames => {
    const compare = (game1, game2) => {
        if (new Date(game1.data.saved) > new Date(game2.data.saved)) {
            return -1;
        } else if (new Date(game1.data.saved) < new Date(game2.data.saved)) {
            return 1;
        }
        return 0;
    }
    const games = savedGames.slice();
    const sortedSavedGames = games.sort(compare);
    return sortedSavedGames;
}
