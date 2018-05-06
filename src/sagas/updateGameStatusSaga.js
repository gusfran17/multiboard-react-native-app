import { takeLatest, call, select, put, } from 'redux-saga/effects';
import { CHECK_GAME_STATUS, UPDATE_GAME_STATUS, updateDisplayStats, updateGameStatus, updatePlayerStatus, } from './../actions';
import { gameSelector, settingsSelector, } from './../selectors';
import { WON, LOST, PLAYING, ENDED, IN_COURSE, } from './../utility/constants';

function* putGameStatus(gameEnded, currentStatus) {
    if (gameEnded && currentStatus !== ENDED) {
        yield put(updateGameStatus(ENDED));
    }
    if (!gameEnded && currentStatus === ENDED) {
        yield put(updateGameStatus(IN_COURSE));
    }
}

function* replacePlayersStatus(players, currentStatus, newStatus) {
    for (let index = 0; index < players.length; index++) {
        const player = players[index];
        if (player.status === currentStatus) {
            console.log('cur', currentStatus, 'new', newStatus);
            yield put(updatePlayerStatus(index, newStatus));
        }
    }
}

// function* checkPlayersStatus(players, maxScoreWins, gameStatus) {
//     let player;
//     let finished = 0;
//     for (let index = 0; index < players.length; index++) {
//         player = players[index];
//         if ((player.status === WON && maxScoreWins) || (player.status === LOST && !maxScoreWins)) {
//             finished++;
//         }
//     }
//     if ((finished>0 && maxScoreWins)||(finished >= players.length - 1 && !maxScoreWins)) {
//         // game is in ENDED status and those still playing are losers
//         yield call(putGameStatus, true, gameStatus);
//         yield call(replacePlayersStatus, players, PLAYING, maxScoreWins? LOST: WON);
//     } else if ((finished>=0 && maxScoreWins)||(finished < players.length - 1 && !maxScoreWins)) {
//         // set game to IN_COURSE when only winner goes back to playing
//         yield call(putGameStatus, false, gameStatus);
//         yield call(replacePlayersStatus, players, maxScoreWins? WON: LOST, PLAYING);
//     }
//
// }

function* checkGameStatus({ status, }) {
    const game = yield select(gameSelector);
    let gameEnded = false;
    let finished= 0;
    let player;
    if (game.maxScoreWins) {
        // Game ended is set in counter component
        for (let index = 0; index < game.players.length; index++) {
            player = game.players[index];
            if (player.status === WON) {
                finished++;
            }
        }
        if (finished>0) {
            // game is in ENDED status and those still playing are losers
            yield call(putGameStatus, true, game.gameStatus);
            yield call(replacePlayersStatus, game.players, PLAYING, LOST);
        } else {
            // set game to IN_COURSE when only winner goes back to playing
            yield call(putGameStatus, false, game.gameStatus);
            yield call(replacePlayersStatus, game.players, LOST, PLAYING);
        }
    } else {
        for (let index = 0; index < game.players.length; index++) {
            player = game.players[index];
            if (player.status === LOST) {
                finished ++;
            }
        }
        if (finished >= game.players.length - 1) {
            // game is in ENDED status and those still playing are winner
            yield call(putGameStatus, true, game.gameStatus);
            yield call(replacePlayersStatus, game.players, PLAYING, WON);
        } else {
            // set game to IN_COURSE when only winners goes back to playing
            yield call(putGameStatus, false, game.gameStatus);
            yield call(replacePlayersStatus, game.players, WON, PLAYING);
        }
    }
}

function* showStats({ gameStatus, }) {
    if (gameStatus === ENDED) {
        yield put(updateDisplayStats(true));
    }
}

export default function* updateGameStatusSaga() {
    yield takeLatest(CHECK_GAME_STATUS, checkGameStatus);
    yield takeLatest(UPDATE_GAME_STATUS, showStats);
}
