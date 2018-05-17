import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { Scoreboard, } from './../components/Scoreboard';
import { addPlayer, removePlayer, updateScore,
    selectPlayer, updateDisplayStats, updatePlayerStatus,
    updateGameStatus, checkGameStatus, updatePlayerElapsedTime,
    updateElapsedTime, updateTimeRunning, } from './../actions';

const mapStateToProps = state => {
    return (
        {
            players: state.gamePlayers.players,
            selectedPlayer: state.game.selectedPlayer,
            maxScore: state.game.maxScore,
            maxScoreWins: state.game.maxScoreWins,
            displayStats: state.game.displayStats,
            gameStatus: state.game.gameStatus,
            timed: state.game.timed,
            time: state.stopwatch.time,
            running: state.stopwatch.running,
        }
    );
};

const mapDispatchToProps = dispatch => ({
    addPlayerDispatcher: name => {
        dispatch(addPlayer(name));
    },
    removePlayerDispatcher: index => {
        dispatch(removePlayer(index));
    },
    updateScoreDispatcher: (index, score) => {
        dispatch(updateScore(index, score));
    },
    selectPlayerDispatcher: index => {
        dispatch(selectPlayer(index));
    },
    updateDisplayStatsDispatcher: displayStats => {
        dispatch(updateDisplayStats(displayStats));
    },
    updatePlayerStatusDispatcher: (index, status, elapsedTime) => {
        dispatch(updatePlayerStatus(index, status, elapsedTime));
    },
    updateGameStatusDispatcher: gameStatus => {
        dispatch(updateGameStatus(gameStatus));
    },
    checkGameStatusDispatcher: () => {
        dispatch(checkGameStatus());
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
