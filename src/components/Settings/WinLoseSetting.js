import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import WinLoseControl from './WinLoseControl';

const WinLoseSetting = props => {
    return (
        <View style={styles.setting}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{props.description}</Text>
            </View>
            <WinLoseControl
                maxScoreWins={props.maxScoreWins}
                toggleWinLose={props.toggleWinLose}
            />
        </View>
    );
}

WinLoseSetting.propTypes = {
    description: PropTypes.string.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
    toggleWinLose: PropTypes.func.isRequired,
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
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
    },
});
export default WinLoseSetting;
