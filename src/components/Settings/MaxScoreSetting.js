import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, } from 'react-native';
import PropTypes from 'prop-types';
import MaxScoreControl from './MaxScoreControl';
import SettingDescriptionLabel from './SettingDescriptionLabel'

const MaxScoreSetting = props => {
    return (
        <View style={styles.setting}>
            <SettingDescriptionLabel text={props.description}/>
            <MaxScoreControl
                maxScore={props.maxScore}
                updateMaxScore={props.updateMaxScore}
            />
        </View>
    );
}

MaxScoreSetting.propTypes = {
    description: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    updateMaxScore: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    setting: {
        flexDirection: 'row',
        backgroundColor: '#333',
        borderBottomColor: '#444',
        borderBottomWidth: 2,
    },
});
export default MaxScoreSetting;
