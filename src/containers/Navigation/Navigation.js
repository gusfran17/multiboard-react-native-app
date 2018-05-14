import React from 'react';
import { createStackNavigator, } from 'react-navigation';
import Settings from './../Settings';
import Scoreboard from './../Scoreboard';
import MainMenu from './../MainMenu';
import SavedGames from './../SavedGames';
import NewGameSettings from './../NewGameSettings'

const GameStack = createStackNavigator({
    Scoreboard:  Scoreboard,
    Settings: Settings,
},
{
    mode: 'modal',
    headerMode: 'screen',
});

const MainStack = createStackNavigator({
    MainMenu: MainMenu,
    Game: GameStack,
    NewGameSettings: NewGameSettings,
    SavedGames: SavedGames,
},
{
    initialRouteName: 'MainMenu',
    headerMode: 'none',
});


export default MainStack;
