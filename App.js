import React, { Component, } from 'react';
import { Provider, } from 'react-redux';
import Game from './src/index';
import store from './src/getStore';

console.disableYellowBox = true;
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Game/>
            </Provider>
        );
    }
}
