import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { updateWinOrLose, updateMaxScore, saveProgress, updateTimedGame, updateTimeLimit, } from './../actions';
import { Settings, } from './../components'

const mapStateToProps = state => (
    {
        maxScore: state.game.maxScore,
        maxScoreWins: state.game.maxScoreWins,
        players: state.players.players,
        gameName: state.game.gameName,
        saved: state.game.saved? new Date(state.game.saved): state.game.saved,
        edited: state.game.edited || state.players.edited || state.stopwatch.edited,
        timed: state.game.timed,
        time: state.stopwatch.time,
    }
);

const mapDispatchToProps = dispatch => ({
    updateWinOrLoseDispatcher: maxScoreWins => {
        dispatch(updateWinOrLose(maxScoreWins));
    },
    updateMaxScoreDispatcher: maxScore => {
        dispatch(updateMaxScore(maxScore));
    },
    saveProgressDispatcher: gameName => {
        dispatch(saveProgress(gameName));
    },
    updateTimedGameDispatcher: timed => {
        dispatch(updateTimedGame(timed));
    },
    updateTimeLimitDispatcher: timed => {
        dispatch(updateTimeLimit(timed));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
