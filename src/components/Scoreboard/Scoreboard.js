import React, { Component, } from 'react';
import { Platform, StyleSheet, Text, View,
    ScrollView, TextInput, TouchableOpacity,
    ImageBackground, KeyboardAvoidingView,
    AppState, Vibration,} from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';
import PushNotification from 'react-native-push-notification';
import { KeyboardAwareScrollView, } from 'react-native-keyboard-aware-scrollview';
import { Alert, CustomAlert, } from './../';
import { Header, Player, AddPlayerComponent, } from './';
import { PlayerInfo, } from './../PlayerInfo';
import { GameStats, } from './../GameStats';
import { RightHeader, LeftHeader, } from './../../containers';
import { WON, LOST, PLAYING, ENDED, } from './../../utility/constants';
import { sortPlayersMaxScoreLoses, sortPlayersMaxScoreWins, } from './../../utility/sort';
import BringFromBottom from './../Animation/BringFromBottom';
import { PushController, } from './../PushController';
import { formatMiliseconds, } from './../../utility/format';

class Scoreboard extends Component {

    static navigationOptions = ({ navigation, }) => {
        const params = navigation.state.params || {};
        return {
            headerLeft: <LeftHeader
                title="Bridge game"
            />,
            headerRight: <RightHeader
                navigation={navigation}
            />,
            headerStyle: {
                backgroundColor: '#00000000',
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
        running: PropTypes.bool.isRequired,
        time: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
            showTimerAlert: false,
            background: false,
            appState: 'active',
            messageText: '',
            showMessage: false,
        };
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = appState => {
        if (appState === 'inactive') {
            if (!this.state.background && this.props.timed && this.props.running) {
                PushNotification.localNotification({
                    ticker: "The timer is running in background",
                    message: Platform.OS === 'ios'?
                        "The timer is running in background. You will be notified when the time is out."
                        :
                        "You will be notified when the time is out.",
                    vibration: 300,
                    playSound: true,
                    title: "The timer is running in background",
                    color: "#666",
                });
            }
        }
        if (appState === 'background') {
            this.setState({background: true, });
            if (this.props.timed && this.props.running) {
                PushNotification.localNotification({
                    ticker: "The timer is running in background",
                    message: Platform.OS === 'ios'?
                        "The timer is running in background. You will be notified when the time is out."
                        :
                        "You will be notified when the time is out.",
                    vibration: 300,
                    playSound: true,
                    title: "The timer is running in background",
                });
            }
        }
        if (appState === 'active') {
            this.setState({background: false,});
        }
    }

    scheduleNotification = () => {
        const delay = 1000;
        const currentTime = this.header.stopwatch.getTime();
        const limitTime = formatMiliseconds(this.props.time);
        const difference = limitTime - currentTime;
        if (difference > 1000) {
            PushNotification.localNotificationSchedule({
                ticker: "Time is out!!!",
                message: Platform.OS === 'ios'? "Time is out!!! Check your scores.":"Check your scores.",
                date: new Date(Date.now() + (limitTime-currentTime + delay)),
                vibration: 300,
                playSound: true,
                title: "Time is out!!!",
                color: "#666",
            });
        }
    }

    isValidPlayer = name => {
        let playerExists = false;
        if (name && name.length < 31) {
            for (let player of this.props.players) {
                if (player.name.trim().toUpperCase() === name.trim().toUpperCase()) {
                    playerExists = true;
                }
            }
            if (!playerExists) {
                return true;
            }
        }
        if (name.length > 30) {
            this.showWrongNameMessage('Player names cannot be longer than 30 characters.');
        } else if (!name) {
            this.showWrongNameMessage('Player names cannot be blank.');
        } else if (playerExists) {
            this.showWrongNameMessage('Player names cannot be repeated.');
        }
        return false;
    };

    updatePlayerStatus = (index,status) => {
        if (this.props.timed && (status === WON || status === LOST)) {
            const elapsedTime = this.header.stopwatch.getTime();
            console.log('elapsedTime: ', elapsedTime, this.header.stopwatch.getTime);
            this.props.updatePlayerStatusDispatcher(index, status, elapsedTime);
        } else {
            this.props.updatePlayerStatusDispatcher(index, status, 0);
        }
    }

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
                        updatePlayerStatus={this.updatePlayerStatus}
                        selectPlayer={this.props.selectPlayerDispatcher}
                        updateGameStatus={this.props.updateGameStatusDispatcher}
                        checkGameStatus={this.props.checkGameStatusDispatcher}
                        showDeleteWinnerMessage={this.showDeleteWinnerMessage}
                    />
                </View>
            )
        });
        return playersComponent;
    }

    showDeleteWinnerMessage = () => {
        this.setState({
            showMessage: true,
            messageText: 'You cannot delete the winner.',
        });
    }

    showWrongNameMessage = messageText => {
        this.setState({
            messageText,
            showMessage: true,
        });
    }

    hideMessage = () => {
        this.setState({
            showMessage: false,
        });
    }

    showTimerAlert = () => {
        this.setState({
            showTimerAlert: true,
        }, () => {
            if (this.props.players.length > 0){
                this.props.updateDisplayStatsDispatcher(false);
            };
            if (!this.state.background) {
                const androidPattern = [200, 200, 800, ];
                const iosPattern = [300,300, 100, 100, 100, 100, 300, 300, 100, 100, 100, 100,];
                if (Platform.OS == 'ios')
                    Vibration.vibrate(iosPattern);
                else
                    Vibration.vibrate(androidPattern);
            } else {
                PushNotification.cancelAllLocalNotifications();
            }
        });
    }

    hideTimerAlert = () => {
        this.setState({
            showTimerAlert: false,
        });
    }

    showStats = () => {
        let gameStatsComponent;
        if (this.props.displayStats) {
            if (this.props.players.length > 0) {
                gameStatsComponent = <GameStats
                    updateDisplayStats={this.props.updateDisplayStatsDispatcher}
                    players={this.props.players}
                    timed={this.props.timed}
                    time={this.props.time}
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
                    <KeyboardAwareScrollView>
                        <Header
                            players={this.props.players}
                            maxScore={this.props.maxScore}
                            maxScoreWins={this.props.maxScoreWins}
                            timed={this.props.timed}
                            showTimerAlert={this.showTimerAlert}
                            scheduleNotification={this.scheduleNotification}
                            myRef={header => {this.header = header;}}
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
                    </KeyboardAwareScrollView>
                </BringFromBottom>
                <Alert
                    show={this.state.showMessage}
                    showProgress={false}
                    message={this.state.messageText}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Ok"
                    onConfirmPressed={() => {
                        this.hideMessage();
                    }}
                />
                {this.state.showTimerAlert?
                    <CustomAlert
                        title="Time is out!!!"
                        message="Check the scores to find your positions."
                        confirmText="Ok"
                        onConfirmPressed={() => {
                            this.hideTimerAlert();
                            if (this.props.players.length > 0){
                                this.props.updateDisplayStatsDispatcher(true);
                            };
                        }}
                    />: undefined
                }
                {this.props.timed? <PushController/>: undefined}
            </ImageBackground>
        );
    }
}

const scoreboardContainer = {
    flex: 1,
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
