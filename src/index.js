import React, { Component, } from 'react';
import { addNavigationHelpers, NavigationActions, } from "react-navigation";
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import { Stack, } from './containers';
import Stopwatch from './components/Scoreboard/Stopwatch';
import { addListener, } from './getStore';

class Game extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    }
    render() {
        return (
            <Stack
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                    addListener,
                })}
            />
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(Game);
