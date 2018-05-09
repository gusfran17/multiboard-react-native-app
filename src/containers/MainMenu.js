import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { MainMenu, } from './../components';
import { startNewGame, } from './../actions';

const mapStateToProps = state => (
    {
        activeGame: state.game,
        playersEdited: state.gamePlayers.edited,
        maxScoreWins: state.mainMenu.maxScoreWins,
        maxScore: state.mainMenu.maxScore,
        savedGames: state.mainMenu.savedGames,
    }
);

const mapDispatchToProps = dispatch => ({
    startNewGameDispatcher: settings => {
        dispatch(startNewGame(settings));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
