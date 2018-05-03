import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { Scoreboard, } from './../components/Scoreboard';
import { addPlayer, removePlayer, updateScore, selectPlayer, updateDisplayStats, } from './../actions';

const mapStateToProps = state => {
    return (
        {
            players: state.game.players,
            selectedPlayer: state.game.selectedPlayer,
            maxScore: state.game.maxScore,
            maxScoreWins: state.game.maxScoreWins,
            displayStats: state.game.displayStats,
            gameStatus: state.game.gameStatus,
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
});


export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
