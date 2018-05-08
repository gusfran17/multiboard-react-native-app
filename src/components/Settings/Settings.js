import React, { Component, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch, ImageBackground, KeyboardAvoidingView, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';
import { MaxScoreSetting, WinLoseSetting, SaveGameComponent, MainMenuSettingsFooter, } from './';
import { NavigationHeader, } from './../../components';
import { NewGameSettings, MainMenu, Scoreboard, } from './../../utility/constants';
import BringFromBottom from './../Animation/BringFromBottom';

const Settings = props => (
    <ImageBackground
        resizeMode="cover"
        style={[styles.container, props.navigation.state.routeName === NewGameSettings? styles.settingsNewGame: styles.settingsCurrentGame,]}
        source={require('./../../assets/images/falling_dices_final.png')}>
        <BringFromBottom>
            <KeyboardAvoidingView
                behavior="position"
                enabled={true}
                style={{alignSelf: 'stretch',}}
            >
                <View style={styles.settingsContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Settings</Text>
                    </View>
                    <View style={styles.settings}>
                        <WinLoseSetting
                            description="Top score to win or lose"
                            maxScoreWins={props.maxScoreWins}
                            toggleWinLose={props.updateWinOrLoseDispatcher}
                        />
                        <MaxScoreSetting
                            inputType="max-score"
                            description={ "Top score to " + (props.maxScoreWins? "win":"lose")}
                            maxScore={props.maxScore}
                            updateMaxScore={props.updateMaxScoreDispatcher}
                        />
                    </View>
                    {props.navigation.state.routeName === NewGameSettings?
                        <MainMenuSettingsFooter
                            navigation={props.navigation}
                            maxScore={props.maxScore}
                            maxScoreWins={props.maxScoreWins}
                            startNewGame={props.startNewGameDispatcher}
                        />
                        :
                        <SaveGameComponent
                            edited={props.edited}
                            gameName={props.gameName}
                            saved={props.saved}
                            navigation={props.navigation}
                            saveProgress={props.saveProgressDispatcher}
                        />
                    }
                </View>
            </KeyboardAvoidingView>
        </BringFromBottom>
    </ImageBackground>
);

Settings.navigationOptions = ({ navigation, }) => {
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
        headerLeft: <Icon name={'chevron-left'} color='#444' size={35} onPress={ () => { if (navigation.state.routeName === NewGameSettings) navigation.goBack(); else navigation.navigate(Scoreboard);} }  />,
    };
};

Settings.propTypes = {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
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
        marginTop: -20,
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
        marginBottom: 25,
    },
});

export default Settings;
