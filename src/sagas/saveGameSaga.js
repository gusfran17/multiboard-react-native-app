import { takeLatest, call, select, put, } from 'redux-saga/effects';
import { SAVE_PROGRESS, UPDATE_GAME_NAME, saveGame, updateGame, } from './../actions';
import { gameSelector, savedGamesSelector, activeGameSelector, } from './../selectors';
import { WON, LOST, PLAYING, ENDED, IN_COURSE, } from './../utility/constants';

function* saveGameProgress({ type, gameName, }) {
    const game = yield select(gameSelector);
    const savedGames = yield select(savedGamesSelector);
    const activeGame = yield select(activeGameSelector);
    if (activeGame>=0) {
        yield put(updateGame(activeGame, game));
    } else {
        yield put(saveGame(game));
    }
}

export default function* saveGameSaga() {
    yield takeLatest(SAVE_PROGRESS, saveGameProgress);
}
