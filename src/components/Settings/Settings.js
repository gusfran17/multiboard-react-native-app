import React, { Component, } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, ImageBackground, KeyboardAvoidingView, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';
import { KeyboardAwareScrollView, } from 'react-native-keyboard-aware-scrollview';
import { MaxScoreSetting, WinLoseSetting, FooterSaveGame, FooterNewGame, TimeSetting, TimeLimitSetting, TimeLimitOptions, } from './';
import { NavigationHeader, Alert, } from './../../components';
import { NewGameSettings, MainMenu, Scoreboard, } from './../../utility/constants';
import { BringFromBottom, GrowToScrollView, } from './../Animation';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEmptyNameMessage: false,
            showWrongTimeMessage: false,
            showWinLoseOptions: false,
            showTimedGameSettingsMessage: false,
            messageText: '',
            showMessage: false,
        };
    }

    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: navigation.state.routeName === NewGameSettings?
                <NavigationHeader
                    title="New Game"
                />:
                <NavigationHeader
                    title="Settings"
                />,
            headerStyle: {
                backgroundColor: '#0000',
                height: 85,
                borderBottomWidth: 0,
                alignSelf: 'center',
            },
            headerTintColor: '#0000',
            headerTransparent: true,
            headerLeft: <Icon name={'chevron-left'} color='#fff' size={45} onPress={ () => { if (navigation.state.routeName === NewGameSettings) navigation.goBack(); else navigation.navigate(Scoreboard);} }  />,
        };
    };

    static propTypes = {
        maxScore: PropTypes.number.isRequired,
        maxScoreWins: PropTypes.bool.isRequired,
        updateWinOrLoseDispatcher: PropTypes.func.isRequired,
        updateMaxScoreDispatcher: PropTypes.func.isRequired,
        saveProgressDispatcher: PropTypes.func,
        startNewGameDispatcher: PropTypes.func,
        updateTimedGameDispatcher: PropTypes.func,
        updateTimeLimitDispatcher: PropTypes.func,
        navigation: PropTypes.object,
        players: PropTypes.array.isRequired,
        gameName: PropTypes.string,
        saved: PropTypes.object,
        edited: PropTypes.bool,
        timed: PropTypes.bool.isRequired,
        time: PropTypes.string.isRequired,
    }

    componentDidMount() {
        if (this.props.timed && this.props.navigation.state.routeName !== NewGameSettings) {
            this.showTimedGameSettingsMessage();
        }
    }

    showEmptyNameMessage = () => {
        this.setState({
            showMessage: true,
            messageText: "The name cannot be empty or longer than 30 characters.",
        });
    }

    showWrongTimeMessage = () => {
        this.setState({
            showMessage: true,
            messageText: "You´ve enter a wrong time. (ei. 01:70 should be 02:10)",
        });
    }

    showTimedGameSettingsMessage = () => {
        this.setState({
            showMessage: true,
            messageText: "Any change to top score or win or lose settings in a timed game will cause all progress to be reset.",
        });
    }

    hideMessage = () => {
        this.setState({
            showMessage: false,
        });
    }

    showWinLoseOptions = () => {
        this.setState({
            ...this.state,
            showWinLoseOptions: true,
        });
    }

    hideWinLoseOptions = () => {
        this.setState({
            ...this.state,
            showWinLoseOptions: false,
        });
    }

    timeLimitInput = () => {
        if (this.props.timed) {
            return (
                <TimeLimitSetting
                    description={ "Time alert at (mm:ss)"}
                    timed= {this.props.timed}
                    time= {this.props.time}
                    updateTimeLimit={this.props.updateTimeLimitDispatcher}
                    showWrongTimeMessage={this.showWrongTimeMessage}
                />
            );
        }
    }

    render() {
        return (
            <ImageBackground
                resizeMode="cover"
                style={styles.container}
                source={require('./../../assets/images/falling_dices_final.png')}>
                <BringFromBottom
                    style={animationContainer}>
                    <KeyboardAwareScrollView
                        behavior="position"
                        enabled={true}
                        style={{alignSelf: 'stretch',marginLeft: 15, marginRight: 15,}}
                    >
                        <View style={styles.settingsContainer}>
                            <View style={styles.header}>

                            </View>
                            <View style={styles.settings}>
                                <WinLoseSetting
                                    description="Top score to:"
                                    maxScoreWins={this.props.maxScoreWins}
                                    showWinLoseOptions={this.showWinLoseOptions}
                                />
                                <MaxScoreSetting
                                    description={ "Top score (to " + (this.props.maxScoreWins? "win)":"lose)")}
                                    maxScore={this.props.maxScore}
                                    updateMaxScore={this.props.updateMaxScoreDispatcher}
                                />
                                <TimeSetting
                                    description={ "Timed game"}
                                    timed= {this.props.timed}
                                    time= {this.props.time}
                                    updateTimedGame={this.props.updateTimedGameDispatcher}
                                />
                                {this.timeLimitInput()}
                            </View>
                            {this.props.navigation.state.routeName === NewGameSettings?
                                <FooterNewGame
                                    navigation={this.props.navigation}
                                    maxScore={this.props.maxScore}
                                    maxScoreWins={this.props.maxScoreWins}
                                    timed={this.props.timed}
                                    time={this.props.time}
                                    startNewGame={this.props.startNewGameDispatcher}
                                />
                                :
                                <FooterSaveGame
                                    edited={this.props.edited}
                                    gameName={this.props.gameName}
                                    saved={this.props.saved}
                                    navigation={this.props.navigation}
                                    saveProgress={this.props.saveProgressDispatcher}
                                    showEmptyNameMessage={this.showEmptyNameMessage}
                                />
                            }
                        </View>
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
                {this.state.showWinLoseOptions?
                    <TimeLimitOptions
                        hideWinLoseOptions={this.hideWinLoseOptions}
                        updateWinOrLose={this.props.updateWinOrLoseDispatcher}
                    />
                    :
                    undefined
                }
            </ImageBackground>
        );
    }
}

const animationContainer = {
    flex: 1,
    marginBottom: 100,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
    },
    settingsContainer: {
        backgroundColor: '#444',
        borderRadius: 25,
    },
    SettingsContainer: {
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        flexDirection: 'column',
        backgroundColor: '#222',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#444',
        padding: 20,
    },
    title: {
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center',
        color: '#fff',
        fontSize: 25,
        fontWeight: '900',
        letterSpacing: 2,
        padding: 25,
    },
});

export default Settings;
