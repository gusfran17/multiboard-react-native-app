import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { Stopwatch, } from './../components/Scoreboard';
import { updatePlayerElapsedTime, updateElapsedTime, updateTimeRunning, } from './../actions';

const mapStateToProps = state => {
    return (
        {
            gameStatus: state.game.gameStatus,
            time: state.stopwatch.time,
            running: state.stopwatch.running,
            elapsedTime: state.stopwatch.elapsedTime,
        }
    );
};

const mapDispatchToProps = dispatch => ({
    updateElapsedTimeDispatcher: elapsedTime => {
        dispatch(updateElapsedTime(elapsedTime));
    },
    updateTimeRunningDispatcher: running => {
        dispatch(updateTimeRunning(running));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
