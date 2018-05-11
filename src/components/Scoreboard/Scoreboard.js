import React, { Component, } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView,} from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';
import { Alert, } from './../';
import { Header, Player, AddPlayerComponent, } from './';
import { PlayerInfo, } from './../PlayerInfo';
import { GameStats, } from './../GameStats';
import { RightHeader, } from './../../containers';
import { WON, LOST, PLAYING, ENDED, } from './../../utility/constants';
import { sortPlayersMaxScoreLoses, sortPlayersMaxScoreWins, } from './../../utility/sort';
import BringFromBottom from './../Animation/BringFromBottom';

class Scoreboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showWrongNameAlert: false,
            showDeleteWinnerAlert: false,
            showTimerAlert: false,
            showGameEndedAlert: false,
        };
    }

    static navigationOptions = ({ navigation, }) => {
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

    static propTypes = {
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
        timed: PropTypes.bool.isRequired,
        time: PropTypes.string.isRequired,
    }

    isValidPlayer = name => {
        let playerExists = false;
        if (name) {
            for (let player of this.props.players) {
                if (player.name.trim().toUpperCase() === name.trim().toUpperCase()) {
                    playerExists = true;
                }
            }
            if (!playerExists) {
                return true;
            }
        }
        this.setState({
            showWrongNameAlert: true,
        });
        return false;
    };

    hideWrongNameAlert = () => {
        this.setState({
            ...this.state,
            showWrongNameAlert: false,
        });
    };

    getPlayers = () => {
        const playersComponent = this.props.players.map((player, index) => {
            return (
                <View key={player.name}>
                    <Player
                        name={player.name}
                        score={player.score}
                        index={index}
                        status={player.status}
                        maxScore={this.props.maxScore}
                        maxScoreWins={this.props.maxScoreWins}
                        gameStatus={this.props.gameStatus}
                        removePlayer={this.props.removePlayerDispatcher}
                        updateScore={this.props.updateScoreDispatcher}
                        updatePlayerStatus={this.props.updatePlayerStatusDispatcher}
                        selectPlayer={this.props.selectPlayerDispatcher}
                        updateGameStatus={this.props.updateGameStatusDispatcher}
                        checkGameStatus={this.props.checkGameStatusDispatcher}
                        showDeleteWinnerAlert={this.showDeleteWinnerAlert}
                    />
                </View>
            )
        });
        return playersComponent;
    }

    showDeleteWinnerAlert = () => {
        this.setState({
            ...this.state,
            showDeleteWinnerAlert: true,
        });
    }

    hideDeleteWinnerAlert = () => {
        this.setState({
            ...this.state,
            showDeleteWinnerAlert: false,
        });
    }

    showTimerAlert = () => {
        this.setState({
            ...this.state,
            showTimerAlert: true,
        });
    }

    hideTimerAlert = () => {
        this.setState({
            ...this.state,
            showTimerAlert: false,
        });
    }

    showGameEndedAlert = () => {
        this.setState({
            ...this.state,
            showGameEndedAlert: true,
        });
    }

    hideGameEndedAlert = () => {
        this.setState({
            ...this.state,
            showGameEndedAlert: false,
        });
    }

    showStats = () => {
        let gameStatsComponent;
        if (this.props.displayStats) {
            if (this.props.players.length > 0) {
                gameStatsComponent = <GameStats
                    updateDisplayStats={this.props.updateDisplayStatsDispatcher}
                    players={this.props.players}
                    timed={false}
                    maxScoreWins={this.props.maxScoreWins}
                    gameFinished={this.props.gameStatus === ENDED}/>;
            } else {
                this.props.updateDisplayStatsDispatcher(false);
            }
        }
        return gameStatsComponent;
    }

    getSelectedPlayer = () => {
        let selectedPlayer;
        if (this.props.selectedPlayer > -1) {
            selectedPlayer = this.props.players[this.props.selectedPlayer];
            const sortedPlayers = this.props.maxScoreWins? sortPlayersMaxScoreWins(this.props.players.slice()): sortPlayersMaxScoreLoses(this.props.players.slice());
            for (let index = 0; index < this.props.players.length; index++) {
                if (sortedPlayers[index].name === selectedPlayer.name) {
                    selectedPlayer.rank = index + 1;
                    selectedPlayer.created = sortedPlayers[index].created.toString();
                }
            }
        }
        return selectedPlayer;
    }

    render() {
        return (
            <ImageBackground
                style={styles.container}
                resizeMode="cover"
                source={require('./../../assets/images/back_nice.png')}>
                <PlayerInfo
                    player={this.getSelectedPlayer()}
                    selectPlayer={this.props.selectPlayerDispatcher}
                />
                {this.showStats()}
                <BringFromBottom
                    style={scoreboardContainer}>
                    <KeyboardAvoidingView
                        behavior="position"
                        enabled={true}
                        keyboardVerticalOffset={(Platform.OS === 'ios') ? 50:0}
                    >
                        <Header
                            players={this.props.players}
                            maxScore={this.props.maxScore}
                            maxScoreWins={this.props.maxScoreWins}
                            timed={this.props.timed}
                            time={this.props.time}
                            showWrongTimeAlert={this.showWrongTimeAlert}
                            showTimerAlert={this.showTimerAlert}
                            showGameEndedAlert={this.showGameEndedAlert}
                            gameStatus={this.props.gameStatus}
                        />
                        <View>
                            {this.getPlayers()}
                        </View>
                        <AddPlayerComponent
                            addPlayer={this.props.addPlayerDispatcher}
                            navigation={this.props.navigation}
                            checkGameStatus={this.props.checkGameStatusDispatcher}
                            isValidPlayer={this.isValidPlayer}
                            showPlayersInfoReading={this.props.players.length>0}
                        />
                    </KeyboardAvoidingView>
                </BringFromBottom>
                <Alert
                    show={this.state.showWrongNameAlert}
                    showProgress={false}
                    title="Wrong name"
                    message={`Player names cannot be blank or repeated.`}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Ok"
                    onConfirmPressed={() => {
                        this.hideWrongNameAlert();
                    }}
                />
                <Alert
                    show={this.state.showDeleteWinnerAlert}
                    showProgress={false}
                    message="You cannot delete the winner"
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Ok"
                    onConfirmPressed={() => {
                        this.hideDeleteWinnerAlert();
                    }}
                />
                <Alert
                    show={this.state.showTimerAlert}
                    showProgress={false}
                    title="Time is out!!!"
                    message="Check the scores to find your positions."
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Ok"
                    onConfirmPressed={() => {
                        this.hideTimerAlert();
                        this.props.updateDisplayStatsDispatcher(true);
                    }}
                />
                <Alert
                    show={this.state.showGameEndedAlert}
                    showProgress={false}
                    message="You cannot use the stopwatch once the game is ended."
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Ok"
                    onConfirmPressed={() => {
                        this.hideGameEndedAlert();
                    }}
                />
            </ImageBackground>
        );
    }
}


const scoreboardContainer = {
    marginBottom: 100,
    marginTop: -20,
};

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
