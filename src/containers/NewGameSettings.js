import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { updateNewGameWinOrLose, updateNewGameMaxScore, startNewGame, updateTimedNewGame, updateTimeLimitNewGame,} from './../actions';
import { Settings, } from './../components'

const mapStateToProps = state => (
    {
        maxScore: state.mainMenu.maxScore,
        maxScoreWins: state.mainMenu.maxScoreWins,
        players: [],
        timed: state.mainMenu.timed,
        time:state.mainMenu.time,
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
    updateTimedGameDispatcher: timed => {
        dispatch(updateTimedNewGame(timed));
    },
    updateTimeLimitDispatcher: timed => {
        dispatch(updateTimeLimitNewGame(timed));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
