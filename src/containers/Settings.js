import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { updateWinOrLose, updateMaxScore, saveProgress, } from './../actions';
import { Settings, } from './../components'

const mapStateToProps = state => (
    {
        maxScore: state.game.maxScore,
        maxScoreWins: state.game.maxScoreWins,
        players: state.game.players,
        gameName: state.game.gameName,
        saved: state.game.saved? new Date(state.game.saved): state.game.saved,
        edited: state.game.edited,
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
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
