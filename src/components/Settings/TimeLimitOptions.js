import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch, ImageBackground, KeyboardAvoidingView, } from 'react-native';
import PropTypes from 'prop-types';
import { GrowToScrollView, } from './../Animation';

const TimeLimitOptions = props => (
    <View style={styles.overlayContainer}>
        <View style={styles.overlay}/>
        <TouchableOpacity style={styles.overlayContainer} onPressOut={props.hideWinLoseOptions}>
            <GrowToScrollView style={{ position: 'absolute', top: 120, }} delay={0}>
                <TouchableOpacity
                    onPress={() => {props.updateWinOrLose(true); props.hideWinLoseOptions();}}>
                    <Text style={styles.winLoseOption}>WIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {props.updateWinOrLose(false); props.hideWinLoseOptions();}}>
                    <Text style={styles.winLoseOption}>LOSE</Text>
                </TouchableOpacity>
            </GrowToScrollView>
        </TouchableOpacity>
    </View>
);

TimeLimitOptions.propTypes = {
    hideWinLoseOptions: PropTypes.func.isRequired,
    updateWinOrLose: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#666',
        opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    winLoseOption: {
        color: '#FFF',
        backgroundColor: '#2b2b2b',
        opacity: 1,
        paddingLeft: 55,
        paddingRight: 55,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 3,
        borderColor: '#444',
        zIndex: 1000,
        fontWeight: '900',
        margin:10,
    },
});

export default TimeLimitOptions;
