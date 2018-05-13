import React from 'react';
import { createStackNavigator, } from 'react-navigation';
import Settings from './../Settings';
import Scoreboard from './../Scoreboard';
import MainMenu from './../MainMenu';
import SavedGames from './../SavedGames';
import NewGameSettings from './../NewGameSettings'

const GameStack = createStackNavigator({
    Scoreboard: {
        screen: Scoreboard,
    },
    Settings: {
        screen: Settings,
    },
},
{
    mode: 'modal',
    headerMode: 'screen',
});

const MainStack = createStackNavigator({
    MainMenu: {
        screen: MainMenu,
    },
    Game: {
        screen: GameStack,
    },
    NewGameSettings: {
        screen: NewGameSettings,
    },
    SavedGames: {
        screen: SavedGames,
    },
},
{
    initialRouteName: 'MainMenu',
    headerMode: 'none',
});


export default MainStack;
