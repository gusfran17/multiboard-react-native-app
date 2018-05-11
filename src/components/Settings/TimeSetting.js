import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, } from 'react-native';
import CheckBox from 'react-native-checkbox';
import PropTypes from 'prop-types';

const TimeSetting = props => {
    return (
        <View style={styles.setting}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{props.description}</Text>
            </View>
            <View style={styles.switchContainer}>
                <View style={styles.switchComponent}>
                    <Switch
                        //onTintColor="#efe"
                        thumbTintColor={props.timed? '#FFF':'#999'}
                        tintColor="#444"
                        //thumbTintColor={props.maxScoreWins? '#7f7':'#f77'}
                        value={props.timed}
                        onValueChange={() => {props.updateTimedGame(!props.timed)}}
                    />
                </View>
            </View>
        </View>
    );
}

TimeSetting.propTypes = {
    description: PropTypes.string.isRequired,
    updateTimedGame: PropTypes.func.isRequired,
    timed: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    setting: {
        flexDirection: 'row',
        backgroundColor: '#333',
        borderBottomColor: '#444',
        borderBottomWidth: 2,
    },
    labelContainer: {
        flex: 3,
        flexDirection: 'row',
    },
    label: {
        flex: 3,
        textAlign: 'center',
        color: '#fff',
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
    },
    switchContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#2b2b2b',
    },
    switchComponent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
});

export default TimeSetting;
