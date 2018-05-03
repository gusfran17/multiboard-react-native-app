import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements'

const Stats = props => {
    let total = 0;
    for (let player of props.players) {
        total += player.score;
    }
    return (
        <View style={styles.stats}>
            <Text style={styles.statsLabel}>PLAYERS: <Text style={styles.statsValue}>{props.players.length}</Text></Text>
            <Text style={styles.statsLabel}>TOTAL POINTS: <Text style={styles.statsValue}>{total}</Text></Text>
            <Text style={[styles.statsLabel, styles.statsLabelWinLose,]}>{props.maxScore} POINTS {props.maxScoreWins? 'WINS': 'LOSES'}</Text>
        </View>
    );
}

Stats.propTypes = {
    players: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            score: PropTypes.number,
        })
    ).isRequired,
    maxScore: PropTypes.number.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    stats: {
        flex: 4,
        alignSelf: 'stretch',
        paddingTop: 20,
    },
    statsLabel: {
        textAlign: 'center',
        color: '#666',
        fontSize: 13,
        letterSpacing: 2,
        fontWeight: 'normal',
        padding: 1,
        marginBottom: 10,
    },
    statsValue: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 13,
        letterSpacing: 2,
        fontWeight: 'normal',
        padding: 3,
        marginBottom: 3,
    },
    statsLabelWinLose: {
        marginTop: 15,
        fontWeight: '900',
        color: '#fff',
    },
});

export default Stats;
