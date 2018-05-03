import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { updateDisplayStats, } from './../actions';
import { NavigationBar, } from './../components'

const mapStateToProps = state => (
    {
        playersAmount: state.game.players.length,
    }
);

const mapDispatchToProps = dispatch => ({
    updateDisplayStatsDispatcher: maxScoreWins => {
        dispatch(updateDisplayStats(maxScoreWins));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
