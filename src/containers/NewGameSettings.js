import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { updateNewGameWinOrLose, updateNewGameMaxScore, startNewGame, } from './../actions';
import { Settings, } from './../components'

const mapStateToProps = state => (
    {
        maxScore: state.mainMenu.maxScore,
        maxScoreWins: state.mainMenu.maxScoreWins,
        players: [],
    }
);

const mapDispatchToProps = dispatch => ({
    updateWinOrLoseDispatcher: maxScoreWins => {
        dispatch(updateNewGameWinOrLose(maxScoreWins));
    },
    updateMaxScoreDispatcher: maxScore => {
        dispatch(updateNewGameMaxScore(maxScore));
    },
    startNewGameDispatcher: settings => {
        dispatch(startNewGame(settings));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
