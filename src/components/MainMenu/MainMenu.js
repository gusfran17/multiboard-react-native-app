import React, { Component, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, } from 'react-native';
import PropTypes from 'prop-types';
import { NewGameSettings, Scoreboard, SavedGames, } from './../../utility/constants';

const MainMenu = props => {

    const startNewGame = () => {
        if (props.activeGame.edited) {
            Alert.alert(
                'New game',
                'If you don´t save your game in progress you´ll lose all your data. Are you want to do this?',
                [
                    {
                        text: 'Cancel', onPress: () => {},
                    },
                    {
                        text: 'OK', onPress: () => {
                            props.startNewGameDispatcher({ maxScore: props.maxScore, maxScoreWins: props.maxScoreWins, });
                            props.navigation.navigate(Scoreboard);
                        },
                    },
                ],
                { cancelable: false, }
            );
        } else {
            props.startNewGameDispatcher({ maxScore: props.maxScore, maxScoreWins: props.maxScoreWins,});
            props.navigation.navigate('Scoreboard');
        }
    }

    const continueGame = () => {
        if (props.activeGame.players.length>0) {
            return (
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => {props.navigation.navigate(Scoreboard)}}
                >
                    <Text style={styles.optionButtonText}>
                        Continue game
                    </Text>
                </TouchableOpacity>
            );
        }
    }

    const savedGames  = () => {
        if (props.savedGames.length > 0) {
            return (
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => {props.navigation.navigate(SavedGames)}}
                >
                    <Text style={styles.optionButtonText}>
                        Saved Games
                    </Text>
                </TouchableOpacity>
            );
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  MULTIBOARD
                </Text>
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.header}>Main Menu</Text>
                <View style={styles.body}>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={startNewGame}
                    >
                        <Text style={styles.optionButtonText}>
                            New Game
                        </Text>
                    </TouchableOpacity>
                    {continueGame()}
                    {savedGames()}
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => {props.navigation.navigate(NewGameSettings)}}
                    >
                        <Text style={styles.optionButtonText}>
                            Settings
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

MainMenu.propTypes = {
    navigation: PropTypes.object,
    startNewGameDispatcher: PropTypes.func.isRequired,
    activeGame: PropTypes.object.isRequired,
    maxScore: PropTypes.number.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
    savedGames: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#9a9',
        padding: 15,
    },
    titleContainer: {
        alignSelf: 'stretch',
        alignContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#222',
        padding: 20,
        borderRadius: 20,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
    },
    menuContainer: {
        alignSelf: 'stretch',
        marginTop: 20,
        paddingBottom: 60,
        borderRadius: 20,
        backgroundColor: '#222',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
        padding: 40,
    },
    body: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
    },
    optionButton: {
        height: 44,
        width: 250,
        backgroundColor: '#333',
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
    },
    optionButtonText: {
        textAlign: 'center',
        color: '#999',
        fontWeight: '900',
        padding: 3,
    },
});

export default MainMenu;
