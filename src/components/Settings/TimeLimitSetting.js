import React from 'react';
import { StyleSheet, Text, View, TextInput, } from 'react-native';
import CheckBox from 'react-native-checkbox';
import PropTypes from 'prop-types';
import SettingDescriptionLabel from './SettingDescriptionLabel';
import TimeLimitControl from './TimeLimitControl';

const TimeLimitSettings = props => {
    return (
        <View style={styles.setting}>
            <SettingDescriptionLabel text={props.description}/>
            <TimeLimitControl
                time={props.time}
                updateTimedGame={props.updateTimeLimit}
                showWrongTimeAlert={props.showWrongTimeAlert}
            />
        </View>
    );
}

TimeLimitSettings.propTypes = {
    description: PropTypes.string.isRequired,
    updateTimeLimit: PropTypes.func.isRequired,
    timed: PropTypes.bool.isRequired,
    time: PropTypes.string.isRequired,
    showWrongTimeAlert: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    setting: {
        flexDirection: 'row',
        backgroundColor: '#333',
        borderBottomColor: '#444',
        borderBottomWidth: 2,
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

export default TimeLimitSettings;
