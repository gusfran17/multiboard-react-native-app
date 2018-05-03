import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose, } from 'redux';
import { composeWithDevTools, } from 'redux-devtools-extension';
// import { composeWithDevTools, } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware, } from 'react-navigation-redux-helpers';
import { NavigationActions, } from "react-navigation";
import { GoogleAnalyticsTracker, } from 'react-native-google-analytics-bridge';
import { updatePlayersStatusSaga, updateGameStatusSaga, saveGameSaga, } from './sagas';
import { game, mainMenu, nav, } from './reducers';

const sagaMiddleware = createSagaMiddleware();

const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
// this needs to be called after crteateReactNavigationReduxMiddleware in order to work
export const addListener = createReduxBoundAddListener("root");

const tracker = new GoogleAnalyticsTracker('UA-118659330-1');
console.log(tracker);

// gets the current screen from navigation state
const getCurrentRouteName = navigationState => {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}


// Navigation analytics
const screenTracking = ({ getState, }) => next => action => {
    console.log(getState());
    if (action.type !== NavigationActions.NAVIGATE
        && action.type !== NavigationActions.BACK) {
        console.log(action);
        return next(action);
    }
    const currentScreen = getCurrentRouteName(getState().nav);
    const result = next(action);
    const nextScreen = getCurrentRouteName(getState().nav);
    if (nextScreen !== currentScreen) {

        console.log('currentScreen', currentScreen);
        console.log('nextScreen', nextScreen);
        console.log('action', action);
        // the line below uses the Google Analytics tracker
        // change the tracker here to use other Mobile analytics SDK.
        tracker.trackScreenView(nextScreen);
    }
    return result;
};


const enhancer = composeWithDevTools(
    applyMiddleware(
        sagaMiddleware,
        reactNavigationMiddleware,
        //screenTracking,
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
