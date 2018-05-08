import React, { Component, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';
import { Scoreboard, } from './../../utility/constants';
import { StatefullAnimatedButton, } from './../Button';

const MainMenuSettingsFooter = props => {

    const startNewGame = () => {
        props.startNewGame({ maxScore: props.maxScore, maxScoreWins: props.maxScoreWins, });
        props.navigation.navigate(Scoreboard);
    }

    return (
        <View style={styles.footer}>
            <StatefullAnimatedButton
                onPress={startNewGame}
                text="Start new game"
                width={150}
                delay={1000}
            />
            <StatefullAnimatedButton
                onPress={() => {props.navigation.goBack()}}
                text="Back to menu"
                width={150}
                delay={1000}
            />
        </View>
    );
}

MainMenuSettingsFooter.propTypes = {
    navigation: PropTypes.object,
    startNewGame: PropTypes.func.isRequired,
    maxScore: PropTypes.number.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#222',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 40,
        paddingBottom: 15,
    },
});

export default MainMenuSettingsFooter;
