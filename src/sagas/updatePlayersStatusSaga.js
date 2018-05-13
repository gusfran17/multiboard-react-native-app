import { takeLatest, call, select, put, } from 'redux-saga/effects';
import { UPDATE_PLAYER_SCORE, UPDATE_WIN_OR_LOSE, UPDATE_MAX_SCORE,
    UPDATE_GAME_STATUS, ADD_PLAYER, REMOVE_PLAYER, UPDATE_TIME_LIMIT,
    updatePlayerStatus, checkGameStatus, updateScore, updateElapsedTime,
    updatePlayerElapsedTime, } from './../actions';
import { gameSelector, settingsSelector, playersSelector, } from './../selectors';
import { WON, LOST, PLAYING, ENDED, } from './../utility/constants';

function* putPlayerSatus(index, score, maxScore, currentStatus, newStatus) {
    if (score >= maxScore) {
        yield put(updatePlayerStatus(index, newStatus));
    } else {
        if (currentStatus !== PLAYING) {
            yield put(updatePlayerStatus(index, PLAYING));
        }
    }
}

function* putPlayersStatus({ type, }) {
    const game = yield select(gameSelector);
    const players = yield select(playersSelector);
    // RESET THE GAME DATA IF TIMED GAME
    if (game.timed) {
        for (let index = 0; index < players.length; index++) {
            yield put(updateScore(index, 0));
            yield put(updatePlayerElapsedTime(index, 0));
            yield put(updatePlayerStatus(index, PLAYING));
            yield put(updateElapsedTime(0));
        }
    }
    // CHECK ALL PLAYERS STATUS AFTER CHANGE IN SETTINGS
    for (let index = 0; index < players.length; index++) {
        if (game.maxScoreWins) {
            yield call(putPlayerSatus, index, players[index].score, game.maxScore, players[index].status, WON);
        } else {
            yield call(putPlayerSatus, index, players[index].score, game.maxScore, players[index].status, LOST);
        }
    }
    yield put(checkGameStatus());
}


export default function* updatePlayersStatusSaga() {
    yield takeLatest(UPDATE_MAX_SCORE, putPlayersStatus);
    yield takeLatest(UPDATE_WIN_OR_LOSE, putPlayersStatus);
}
