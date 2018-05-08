import React, { Component, } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView,} from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';
import { Header, Player, AddPlayerComponent, } from './';
import { PlayerInfo, } from './../PlayerInfo';
import { GameStats, } from './../GameStats';
import { RightHeader, } from './../../containers';
import { WON, LOST, PLAYING, ENDED, } from './../../utility/constants';
import { sortPlayersMaxScoreLoses, sortPlayersMaxScoreWins, } from './../../utility/sort';
import BringFromBottom from './../Animation/BringFromBottom';

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
                        maxScore={props.maxScore}
                        maxScoreWins={props.maxScoreWins}
                        gameStatus={props.gameStatus}
                        removePlayer={props.removePlayerDispatcher}
                        updateScore={props.updateScoreDispatcher}
                        updatePlayerStatus={props.updatePlayerStatusDispatcher}
                        selectPlayer={props.selectPlayerDispatcher}
                        updateGameStatus={props.updateGameStatusDispatcher}
                        checkGameStatus={props.checkGameStatusDispatcher}
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
        <ImageBackground
            style={styles.container}
            resizeMode="cover"
            source={require('./../../assets/images/back_nice.png')}>
            <PlayerInfo
                player={getSelectedPlayer()}
                selectPlayer={props.selectPlayerDispatcher}
            />
            {showStats()}
            <BringFromBottom
                style={scoreboardContainer}>
                <KeyboardAvoidingView
                    behavior="position"
                    enabled={true}
                    keyboardVerticalOffset={(Platform.OS === 'ios') ? 50:0}
                >
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
                        checkGameStatus={props.checkGameStatusDispatcher}
                    />
                </KeyboardAvoidingView>
            </BringFromBottom>
        </ImageBackground>
    );
}

Scoreboard.navigationOptions = ({ navigation, }) => {
    const params = navigation.state.params || {};
    return {
        headerRight: <RightHeader
            navigation={navigation}
        />,
        headerStyle: {
            backgroundColor: '#ff00ff00',
            height: 85,
            borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTransparent: true,
    };
};

const scoreboardContainer = {
    marginBottom: 100,
    marginTop: -20,
};

Scoreboard.propTypes = {
    players: PropTypes.array.isRequired,
    updateScoreDispatcher: PropTypes.func.isRequired,
    updatePlayerStatusDispatcher: PropTypes.func.isRequired,
    removePlayerDispatcher: PropTypes.func.isRequired,
    addPlayerDispatcher: PropTypes.func.isRequired,
    selectPlayerDispatcher: PropTypes.func.isRequired,
    updateDisplayStatsDispatcher: PropTypes.func.isRequired,
    updateGameStatusDispatcher: PropTypes.func.isRequired,
    checkGameStatusDispatcher: PropTypes.func.isRequired,
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
        marginTop: 0,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
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
