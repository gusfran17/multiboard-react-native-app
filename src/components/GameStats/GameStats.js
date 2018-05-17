import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import PositionsTable from './PositionsTable'
import { WON, LOST, PLAYING, } from './../../utility/constants';
import { sortPlayersMaxScoreLoses, sortPlayersMaxScoreWins, } from './../../utility/sort';
import { StatefullAnimatedButton, } from './../Button';
import { formatTime, } from './../../utility/format';

const GameStats = props => {
    const sortedPlayers = props.maxScoreWins?
        sortPlayersMaxScoreWins(props.players.slice())
        :
        sortPlayersMaxScoreLoses(props.players.slice());
    const gameFinishedTitleComponent = () => {
        if (props.gameFinished) {
            return (
                <View>
                    <Text style={styles.titleName}>
                        {sortedPlayers[0].name}
                    </Text>
                    <Text style={styles.titleWin}>
                        WON!!!
                    </Text>
                </View>
            );
        }
    }

    return (
        <View style={styles.overlayContainer}>
            <View style={styles.overlay}/>
            <View style={[ styles.container, ]}>
                {gameFinishedTitleComponent()}
                <Text style={styles.subTitle}>Scores</Text>
                <PositionsTable
                    players={sortedPlayers}
                    timed={props.timed}
                    showTime={props.gameFinished && props.timed}
                    maxScoreWins={props.maxScoreWins}
                    time={props.time}
                />
                <StatefullAnimatedButton
                    onPress={() => {props.updateDisplayStats(false);}}
                    text="Continue"
                    width={120}
                    delay={700}
                />
            </View>
        </View>
    );
}

GameStats.propTypes = {
    players: PropTypes.array.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
    timed: PropTypes.bool.isRequired,
    time: PropTypes.string.isRequired,
    gameFinished: PropTypes.bool.isRequired,
    updateDisplayStats: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        zIndex: 10,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#666',
        opacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    container: {
        position: 'absolute',
        top: 100,
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
    titleName: {
        textAlign: 'center',
        color: '#fff',
        paddingTop: 15,
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
        fontSize: 20,
    },
    titleWin: {
        textAlign: 'center',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
        fontSize: 30,
    },
    subTitle: {
        textAlign: 'center',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '600',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
});

export default GameStats;
