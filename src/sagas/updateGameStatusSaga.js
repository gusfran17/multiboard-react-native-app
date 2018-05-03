import { takeLatest, call, select, put, } from 'redux-saga/effects';
import { UPDATE_PLAYER_STATUS, UPDATE_GAME_STATUS, updateDisplayStats, updateGameStatus, } from './../actions';
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

function* setGameStatus({ status, }) {
    const game = yield select(gameSelector);
    let gameEnded = false;
    let finished= 0;
    let player;
    if (game.maxScoreWins) {
        for (let index = 0; index < game.players.length; index++) {
            player = game.players[index];
            if (player.score >= game.maxScore && game.gameStatus !== ENDED) {
                gameEnded = true;
            }
        }
        if (status !== LOST) yield call(putGameStatus, gameEnded, game.gameStatus);
    } else {
        for (let index = 0; index < game.players.length; index++) {
            player = game.players[index];
            if (player.score >= game.maxScore) {
                finished ++;
            }
        }
        gameEnded = finished >= game.players.length - 1;
        if (status !== WON) yield call(putGameStatus, gameEnded, game.gameStatus);
    }
}

function* showStats({ gameStatus, }) {
    if (gameStatus === ENDED) {
        yield put(updateDisplayStats(true));
    }
}

export default function* updateGameStatusSaga() {
    yield takeLatest(UPDATE_PLAYER_STATUS, setGameStatus);
    yield takeLatest(UPDATE_GAME_STATUS, showStats);
}
