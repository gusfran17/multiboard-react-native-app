import React, { Component, } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';
import { Header, Player, AddPlayerComponent, } from './';
import { PlayerInfo, } from './../PlayerInfo';
import { GameStats, } from './../GameStats';
import { NavigationBar, } from './../../containers';
import { WON, LOST, PLAYING, ENDED, } from './../../utility/constants';
import { sortPlayersMaxScoreLoses, sortPlayersMaxScoreWins, } from './../../utility/sort';

const Scoreboard = props => {

    const getPlayers = () => {
        const playersComponent = props.players.map((player, index) => {
            return (
                <View key={player.name}>
                    <Player
                        name={player.name}
                        score={player.score}
                        index={index}
                        status={player.status}
                        removePlayer={props.removePlayerDispatcher}
                        updateScore={props.updateScoreDispatcher}
                        selectPlayer={props.selectPlayerDispatcher}
                    />
                </View>
            )
        });
        return playersComponent;
    }

    const showStats = () => {
        let gameStatsComponent;
        if (props.displayStats) {
            if (props.players.length > 0) {
                gameStatsComponent = <GameStats
                    updateDisplayStats={props.updateDisplayStatsDispatcher}
                    players={props.players}
                    timed={false}
                    maxScoreWins={props.maxScoreWins}
                    gameFinished={props.gameStatus === ENDED}/>;
            }
        }
        return gameStatsComponent;
    }

    const getSelectedPlayer = () => {
        let selectedPlayer;
        if (props.selectedPlayer > -1) {
            selectedPlayer = props.players[props.selectedPlayer];
            const sortedPlayers = props.maxScoreWins? sortPlayersMaxScoreWins(props.players.slice()): sortPlayersMaxScoreLoses(props.players.slice());
            for (let index = 0; index < props.players.length; index++) {
                if (sortedPlayers[index].name === selectedPlayer.name) {
                    selectedPlayer.rank = index + 1;
                }
            }
        }
        return selectedPlayer;
    }

    const playersComponent = getPlayers();


    return (
        <View style={styles.container}>
            <PlayerInfo
                player={getSelectedPlayer()}
                selectPlayer={props.selectPlayerDispatcher}
            />
            {showStats()}
            <ScrollView style={styles.scoreboardContainer}>
                <Header
                    players={props.players}
                    maxScore={props.maxScore}
                    maxScoreWins={props.maxScoreWins}
                />
                <View>
                    {playersComponent}
                </View>
                <AddPlayerComponent
                    addPlayer={props.addPlayerDispatcher}
                    navigation={props.navigation}
                />
            </ScrollView>
        </View>
    );
}

Scoreboard.navigationOptions = ({ navigation, }) => {
    const params = navigation.state.params || {};
    return {
        headerTitle: <NavigationBar
            navigation={navigation}
            showControls={true}
            title="SCOREBOARD"
        />,
        headerStyle: {
            backgroundColor: '#9a9',
            height: 85,
        },
        headerTintColor: '#222',
    };
};

Scoreboard.propTypes = {
    players: PropTypes.array.isRequired,
    updateScoreDispatcher: PropTypes.func.isRequired,
    removePlayerDispatcher: PropTypes.func.isRequired,
    addPlayerDispatcher: PropTypes.func.isRequired,
    selectPlayerDispatcher: PropTypes.func.isRequired,
    updateDisplayStatsDispatcher: PropTypes.func.isRequired,
    navigation: PropTypes.object,
    maxScore: PropTypes.number.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
    gameStatus: PropTypes.string.isRequired,
    selectedPlayer: PropTypes.number.isRequired,
    displayStats: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9a9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    scoreboardContainer: {
        alignSelf: 'stretch',
        marginTop: 20,
    },
    titleContainer: {
        alignSelf: 'stretch',
        alignContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#333',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
    },
});

export default Scoreboard;
