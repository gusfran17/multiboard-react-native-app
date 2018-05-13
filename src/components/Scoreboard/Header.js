import React, {Component,} from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import PropTypes from 'prop-types';
import { Stopwatch, } from './../../containers';
import Stats from './Stats';

class Header extends Component {

    static propTypes = {
        players: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                score: PropTypes.number,
            })
        ).isRequired,
        maxScore: PropTypes.number.isRequired,
        maxScoreWins: PropTypes.bool.isRequired,
        timed: PropTypes.bool.isRequired,
        myRef: PropTypes.func.isRequired,
        showTimerAlert: PropTypes.func.isRequired,
        showGameEndedAlert: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.myRef(this);
    }

    render() {
        return (
            <View style={styles.header}>
                <Stats
                    players={this.props.players}
                    maxScore={this.props.maxScore}
                    maxScoreWins={this.props.maxScoreWins}
                />
                {this.props.timed?
                    <Stopwatch
                        myRef={stopwatch => {this.stopwatch = stopwatch}}
                        showTimerAlert={this.props.showTimerAlert}
                        showGameEndedAlert={this.props.showGameEndedAlert}
                    />: undefined
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#222',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#444',
    },
});

export default Header;
