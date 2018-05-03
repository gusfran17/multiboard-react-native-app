import { takeLatest, call, select, put, } from 'redux-saga/effects';
import { UPDATE_SCORE, UPDATE_WIN_OR_LOSE, UPDATE_MAX_SCORE, UPDATE_GAME_STATUS, ADD_PLAYER, REMOVE_PLAYER, updatePlayerStatus, } from './../actions';
import { gameSelector, settingsSelector, } from './../selectors';
import { WON, LOST, PLAYING, ENDED, } from './../utility/constants';

function* putPlayerSatus(index, game, status) {
    let player = game.players[index];
    let maxScore = game.maxScore;
    if (maxScore <= player.score) {
        if (player.status !== status) {
            yield put(updatePlayerStatus(index, status));
        }
    } else {
        if (player.status === status) {
            yield put(updatePlayerStatus(index, PLAYING));
        }
    }
}

function* putPlayersStatus({ type, }) {
    const game = yield select(gameSelector);
    if (type === ADD_PLAYER) {
        yield put(updatePlayerStatus(game.players.length - 1, PLAYING));
    }
    for (let index = 0; index < game.players.length; index++) {
        if (game.maxScoreWins) {
            yield call(putPlayerSatus, index, game, WON);
        } else {
            yield call(putPlayerSatus, index, game, LOST);
        }
    }
}

function* putPlayersFinalState({ gameStatus, }) {
    const game = yield select(gameSelector);
    let player;
    if (gameStatus === ENDED) {
        for (let index = 0; index < game.players.length; index++) {
            if (game.maxScoreWins && game.players[index].status === PLAYING) {
                yield put(updatePlayerStatus(index, LOST));
            }
            if (!game.maxScoreWins && game.players[index].status === PLAYING) {
                yield put(updatePlayerStatus(index, WON));
            }
        }
    } else {
        for (let index = 0; index < game.players.length; index++) {
            if (game.maxScoreWins && game.players[index].status === LOST) {
                yield put(updatePlayerStatus(index, PLAYING));
            }
            if (!game.maxScoreWins && game.players[index].status === WON) {
                yield put(updatePlayerStatus(index, PLAYING));
            }
        }
    }
}

export default function* updatePlayersStatusSaga() {
    yield takeLatest(REMOVE_PLAYER, putPlayersStatus);
    yield takeLatest(ADD_PLAYER, putPlayersStatus);
    yield takeLatest(UPDATE_SCORE, putPlayersStatus);
    yield takeLatest(UPDATE_MAX_SCORE, putPlayersStatus);
    yield takeLatest(UPDATE_WIN_OR_LOSE, putPlayersStatus);
    yield takeLatest(UPDATE_GAME_STATUS, putPlayersFinalState);
}
