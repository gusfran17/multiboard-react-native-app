import React from 'react';
import { StackNavigator, } from 'react-navigation';
import Settings from './Settings';
import Scoreboard from './Scoreboard';
import MainMenu from './MainMenu';
import SavedGames from './SavedGames';
import NewGameSettings from './NewGameSettings'

const GameStack = StackNavigator({
    Scoreboard: {
        screen: Scoreboard,
    },
    Settings: {
        screen: Settings,
    },
},
{
    mode: 'modal',
    headerMode: 'none',
});

const MainStack = StackNavigator({
    MainMenu: {
        screen: MainMenu,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#9a9',
            },
            headerTintColor: '#222',
        },
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
});


export default MainStack;
