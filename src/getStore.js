import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose, } from 'redux';
import { composeWithDevTools, } from 'redux-devtools-extension';
// import { composeWithDevTools, } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware, } from 'react-navigation-redux-helpers';
import { updatePlayersStatusSaga, updateGameStatusSaga, saveGameSaga, } from './sagas';
import { game, mainMenu, nav, } from './reducers';
import screenTracking from './utility/gaTracking';

const sagaMiddleware = createSagaMiddleware();

const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
// this needs to be called after crteateReactNavigationReduxMiddleware in order to work
export const addListener = createReduxBoundAddListener("root");

const enhancer = composeWithDevTools(
    applyMiddleware(
        sagaMiddleware,
        reactNavigationMiddleware,
        screenTracking,
        //logger,
    ),
);

const combinedReducer = combineReducers({
    game,
    mainMenu,
    nav,
});

const store = createStore(
    combinedReducer,
    enhancer,
);

sagaMiddleware.run(updatePlayersStatusSaga);
sagaMiddleware.run(updateGameStatusSaga);
sagaMiddleware.run(saveGameSaga);

export default store;
