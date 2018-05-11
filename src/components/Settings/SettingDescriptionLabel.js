import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import PropTypes from 'prop-types';

const SettingDescriptionLabel = props => (
    <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.text}</Text>
    </View>
)

SettingDescriptionLabel.propTypes = {
    text: PropTypes.string.isRequired,
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
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
    },
});

export default SettingDescriptionLabel;
