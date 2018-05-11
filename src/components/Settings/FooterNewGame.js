import React, { Component, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';
import { Scoreboard, } from './../../utility/constants';
import { StatefullAnimatedButton, } from './../Button';

const FooterNewGame = props => {

    const startNewGame = () => {
        const settings = {
            maxScore: props.maxScore,
            maxScoreWins: props.maxScoreWins,
            timed: props.timed,
            time: props.time,
        };
        props.startNewGame(settings);
        props.navigation.navigate(Scoreboard);
    }

    return (
        <View style={styles.footer}>
            <StatefullAnimatedButton
                onPress={startNewGame}
                text="Start"
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

FooterNewGame.propTypes = {
    navigation: PropTypes.object,
    startNewGame: PropTypes.func.isRequired,
    maxScore: PropTypes.number.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
    timed: PropTypes.bool.isRequired,
    time: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#222',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 25,
        paddingBottom: 15,
    },
});

export default FooterNewGame;
