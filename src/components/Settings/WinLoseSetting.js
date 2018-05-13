import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import WinLoseControl from './WinLoseControl';
import SettingDescriptionLabel from './SettingDescriptionLabel'

const WinLoseSetting = props => {
    return (
        <View style={styles.setting}>
            <SettingDescriptionLabel text={props.description}/>
            <WinLoseControl
                maxScoreWins={props.maxScoreWins}
                showWinLoseOptions={props.showWinLoseOptions}
            />
        </View>
    );
}

WinLoseSetting.propTypes = {
    description: PropTypes.string.isRequired,
    maxScoreWins: PropTypes.bool.isRequired,
    showWinLoseOptions: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    setting: {
        flexDirection: 'row',
        backgroundColor: '#333',
        borderBottomColor: '#444',
        borderBottomWidth: 2,
    },
});
export default WinLoseSetting;
