import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { loadGame, removeGame, } from './../actions';
import { SavedGames, } from './../components'

const mapStateToProps = state => (
    {
        savedGames: state.mainMenu.savedGames,
        activeGameNotSaved: state.game.edited || state.players.edited,
    }
);

const mapDispatchToProps = dispatch => ({
    loadGameDispatcher: (game, index) => {
        dispatch(loadGame(game, index));
    },
    removeGameDispatcher: (game, index) => {
        dispatch(removeGame(game, index));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(SavedGames);
