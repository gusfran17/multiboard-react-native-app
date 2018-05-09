import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { updateDisplayStats, } from './../../actions';
import { RightHeader, } from './../../components'

const mapStateToProps = state => (
    {
        playersAmount: state.gamePlayers.players.length,
        playerInfoDisplayed: state.game.displayStats,
    }
);

const mapDispatchToProps = dispatch => ({
    updateDisplayStatsDispatcher: maxScoreWins => {
        dispatch(updateDisplayStats(maxScoreWins));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(RightHeader);
