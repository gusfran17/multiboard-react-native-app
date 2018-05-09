import React, { Component, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch, ImageBackground, KeyboardAvoidingView, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';
import { MaxScoreSetting, WinLoseSetting, SaveGameComponent, MainMenuSettingsFooter, } from './';
import { NavigationHeader, Alert, } from './../../components';
import { NewGameSettings, MainMenu, Scoreboard, } from './../../utility/constants';
import BringFromBottom from './../Animation/BringFromBottom';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEmptyNameAlert: false,
        };
    }

    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: navigation.state.routeName === NewGameSettings?
                <NavigationHeader
                    title="New Game"
                />: null,
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

    propTypes = {
        maxScore: PropTypes.number.isRequired,
        maxScoreWins: PropTypes.bool.isRequired,
        updateWinOrLoseDispatcher: PropTypes.func.isRequired,
        updateMaxScoreDispatcher: PropTypes.func.isRequired,
        saveProgressDispatcher: PropTypes.func,
        startNewGameDispatcher: PropTypes.func,
        navigation: PropTypes.object,
        players: PropTypes.array.isRequired,
        gameName: PropTypes.string,
        saved: PropTypes.object,
        edited: PropTypes.bool,
    }

    showEmptyNameAlert = () => {
        this.setState({
            ...this.state,
            showEmptyNameAlert: true,
        });
    }

    hideEmptyNameAlert = () => {
        this.setState({
            ...this.state,
            showEmptyNameAlert: false,
        });
    }

    render() {
        return (
            <ImageBackground
                resizeMode="cover"
                style={[styles.container, this.props.navigation.state.routeName === NewGameSettings? styles.settingsNewGame: styles.settingsCurrentGame,]}
                source={require('./../../assets/images/falling_dices_final.png')}>
                <BringFromBottom>
                    <KeyboardAvoidingView
                        behavior="position"
                        enabled={true}
                        style={{alignSelf: 'stretch',margin: 15,}}
                    >
                        <View style={styles.settingsContainer}>
                            <View style={styles.header}>
                                <Text style={styles.title}>Settings</Text>
                            </View>
                            <View style={styles.settings}>
                                <WinLoseSetting
                                    description="Top score to win or lose"
                                    maxScoreWins={this.props.maxScoreWins}
                                    toggleWinLose={this.props.updateWinOrLoseDispatcher}
                                />
                                <MaxScoreSetting
                                    inputType="max-score"
                                    description={ "Top score to " + (this.props.maxScoreWins? "win":"lose")}
                                    maxScore={this.props.maxScore}
                                    updateMaxScore={this.props.updateMaxScoreDispatcher}
                                />
                                <MaxScoreSetting
                                    inputType="max-score"
                                    description={ "Top score to " + (this.props.maxScoreWins? "win":"lose")}
                                    maxScore={this.props.maxScore}
                                    updateMaxScore={this.props.updateMaxScoreDispatcher}
                                />
                            </View>
                            {this.props.navigation.state.routeName === NewGameSettings?
                                <MainMenuSettingsFooter
                                    navigation={this.props.navigation}
                                    maxScore={this.props.maxScore}
                                    maxScoreWins={this.props.maxScoreWins}
                                    startNewGame={this.props.startNewGameDispatcher}
                                />
                                :
                                <SaveGameComponent
                                    edited={this.props.edited}
                                    gameName={this.props.gameName}
                                    saved={this.props.saved}
                                    navigation={this.props.navigation}
                                    saveProgress={this.props.saveProgressDispatcher}
                                    showEmptyNameAlert={this.showEmptyNameAlert}
                                />
                            }
                        </View>
                    </KeyboardAvoidingView>
                </BringFromBottom>
                <Alert
                    show={this.state.showEmptyNameAlert}
                    showProgress={false}
                    message="The name cannot be empty."
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Ok"
                    onConfirmPressed={() => {
                        this.hideEmptyNameAlert();
                    }}
                />
            </ImageBackground>
        );
    }
}

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
        borderRadius: 20,
    },
    settingsNewGame: {
        marginTop: 0,
    },
    settingsCurrentGame: {
        marginTop: 0,
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
    },
    title: {
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center',
        color: '#fff',
        fontSize: 30,
        fontWeight: '900',
        letterSpacing: 2,
        padding: 35,
    },
});

export default Settings;
