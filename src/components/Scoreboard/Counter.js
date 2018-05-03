import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';

const Counter = props => {
    return (
        <View style={styles.counter}>
            <TouchableOpacity
                style={styles.updateScoreMinus}
                onPress={() => { props.updateScore(props.index, -1)}}
            >
                <Text style={styles.updateScoreIcon}>-</Text>
            </TouchableOpacity>
            <View style={styles.scoreValue}>
                <Text style={styles.scoreValueText}>{props.score}</Text>
            </View>
            <TouchableOpacity
                style={styles.updateScorePlus}
                onPress={() => { props.updateScore(props.index, 1)}}
            >
                <Text style={styles.updateScoreIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

Counter.propTypes = {
    score: PropTypes.number.isRequired,
    updateScore: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    counter: {
        flex: 3,
        flexDirection: 'row',
    },
    updateScoreMinus: {
        flex: 2,
        backgroundColor: '#ef5350',
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateScorePlus: {
        flex: 2,
        backgroundColor: '#66bb6a',
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
