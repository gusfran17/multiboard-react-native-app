import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import { WON, LOST, PLAYING, ENDED, } from './../../utility/constants';

const Counter = props => {

    const updateScoreMaxScoreWins = delta => {
        let status;
        if (props.score + delta >= props.maxScore) {
            status = WON;
        } else if (props.score + delta < props.maxScore && props.gameStatus !== ENDED) {
            status = PLAYING;
        } else {
            // Lower than max score and game ended
            status = LOST;
        }
        if (props.status !== status) {
            props.updatePlayerStatus(props.index, status);
            if (status === WON && props.gameStatus !== ENDED) {
                props.checkGameStatus();
            } if (status !== WON && props.gameStatus === ENDED) {
                props.checkGameStatus();
            }
        }
        props.updateScore(props.index, props.score + delta);
    }

    const updateScoreMaxScoreLoses = delta => {
        let status;
        if (props.score + delta >= props.maxScore) {
            status = LOST;
        } else if (props.score + delta < props.maxScore && props.status !== WON) {
            status = PLAYING;
        } else {
            // player was winning and still is
            status = WON;
        }
        if (props.status !== status) {
            props.updatePlayerStatus(props.index, status);
            props.checkGameStatus();
        }
        props.updateScore(props.index, props.score + delta);
    }

    return (
        <View style={styles.counter}>
            <TouchableOpacity
                style={styles.updateScoreMinus}
                onPress={props.maxScoreWins? () => {updateScoreMaxScoreWins(-1)}: () => {updateScoreMaxScoreLoses(-1)}}
            >
                <Text style={styles.updateScoreIcon}>-</Text>
            </TouchableOpacity>
            <View style={styles.scoreValue}>
                <Text style={styles.scoreValueText}>{props.score}</Text>
            </View>
            <TouchableOpacity
                style={styles.updateScorePlus}
                onPress={props.maxScoreWins? () => {updateScoreMaxScoreWins(1)}: () => {updateScoreMaxScoreLoses(1)}}
            >
                <Text style={styles.updateScoreIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

Counter.propTypes = {
    score: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ WON, LOST, PLAYING, ]).isRequired,
    index: PropTypes.number.isRequired,
    maxScore: PropTypes.number.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
    gameStatus: PropTypes.string.isRequired,
    updateScore: PropTypes.func.isRequired,
    updatePlayerStatus: PropTypes.func.isRequired,
    checkGameStatus: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    counter: {
        flex: 3,
        flexDirection: 'row',
    },
    updateScoreMinus: {
        flex: 2,
        backgroundColor: '#dd2323',
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateScorePlus: {
        flex: 2,
        backgroundColor: '#33bb33',
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateScoreIcon: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
    },
    scoreValue: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    scoreValueText: {
        flex: 1,
        textAlign: 'center',
        color: '#ddd',
        fontWeight: '900',
        fontSize: 15,
    },
});

export default Counter;
