import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose, } from 'redux';
import { composeWithDevTools, } from 'redux-devtools-extension';
// import { composeWithDevTools, } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import { updatePlayersStatusSaga, updateGameStatusSaga, saveGameSaga, } from './sagas';
import { game, mainMenu, } from './reducers';

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeWithDevTools(
    applyMiddleware(
        sagaMiddleware,
        //logger,
    ),
);

const combinedReducer = combineReducers({
    game,
    mainMenu,
});

const store = createStore(
    combinedReducer,
    enhancer,
);

sagaMiddleware.run(updatePlayersStatusSaga);
sagaMiddleware.run(updateGameStatusSaga);
sagaMiddleware.run(saveGameSaga);

export default store;
