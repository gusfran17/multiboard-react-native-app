import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { loadGame, } from './../actions';
import { SavedGames, } from './../components'

const mapStateToProps = state => (
    {
        savedGames: state.mainMenu.savedGames,
        activeGameNotSaved: state.game.edited,
    }
);

const mapDispatchToProps = dispatch => ({
    loadGameDispatcher: game => {
        dispatch(loadGame(game));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(SavedGames);
