import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, } from 'react-native';
import PropTypes from 'prop-types';
import MaxScoreControl from './MaxScoreControl';

const MaxScoreSetting = props => {
    return (
        <View style={styles.setting}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{props.description}</Text>
            </View>
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
export default MaxScoreSetting;
