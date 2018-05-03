import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import PositionsTable from './PositionsTable'
import { WON, LOST, PLAYING, } from './../../utility/constants';
import { sortPlayersMaxScoreLoses, sortPlayersMaxScoreWins, } from './../../utility/sort';


const GameStats = props => {
    const sortedPlayers = props.maxScoreWins? sortPlayersMaxScoreWins(props.players.slice()): sortPlayersMaxScoreLoses(props.players.slice());
    const gameFinishedTitleComponent = props.gameFinished? <Text style={styles.title}>{sortedPlayers[0].name} WON!</Text>:undefined;
    return (
        <View style={[ styles.container, ]}>
            {gameFinishedTitleComponent}
            <Text style={styles.subTitle}>Scores</Text>
            <PositionsTable
                players={sortedPlayers}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {props.updateDisplayStats(false)}}
            >
                <Text style={styles.buttonText}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    );
}

GameStats.propTypes = {
    players: PropTypes.array.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
    timed: PropTypes.bool.isRequired,
    gameFinished: PropTypes.bool.isRequired,
    updateDisplayStats: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 75,
        zIndex: 10,
        width: 300,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
        borderColor: '#444',
        borderWidth: 3,
        borderRadius: 15,
        paddingBottom: 30,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        paddingTop: 30,
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
        fontSize: 20,
    },
    subTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        paddingTop: 30,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '600',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    button: {
        flex: 1,
        backgroundColor: '#333',
        margin: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#999',
        fontWeight: '900',
    },
});

export default GameStats;
