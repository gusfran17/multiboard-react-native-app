import { takeLatest, call, select, put, } from 'redux-saga/effects';
import { UPDATE_PLAYER_SCORE, UPDATE_WIN_OR_LOSE, UPDATE_MAX_SCORE, UPDATE_GAME_STATUS, ADD_PLAYER, REMOVE_PLAYER, updatePlayerStatus, checkGameStatus, } from './../actions';
import { gameSelector, settingsSelector, } from './../selectors';
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
    for (let index = 0; index < game.players.length; index++) {
        if (game.maxScoreWins) {
            yield call(putPlayerSatus, index, game.players[index].score, game.maxScore, game.players[index].status, WON);
        } else {
            yield call(putPlayerSatus, index, game.players[index].score, game.maxScore, game.players[index].status, LOST);
        }
    }
    yield put(checkGameStatus());
}


export default function* updatePlayersStatusSaga() {
    yield takeLatest(UPDATE_MAX_SCORE, putPlayersStatus);
    yield takeLatest(UPDATE_WIN_OR_LOSE, putPlayersStatus);

}
