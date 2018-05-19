import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { updateDisplayStats, } from './../../actions';
import { RightHeader, } from './../../components'

const mapStateToProps = state => (
    {
        playersAmount: state.players.players.length,
        playerInfoDisplayed: state.game.displayStats,
        running: state.stopwatch.running,
    }
);

const mapDispatchToProps = dispatch => ({
    updateDisplayStatsDispatcher: maxScoreWins => {
        dispatch(updateDisplayStats(maxScoreWins));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(RightHeader);
