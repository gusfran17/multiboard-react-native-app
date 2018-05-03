import React, { Component, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';


const MainMenuSettingsFooter = props => (
    <View style={styles.footer}>
        <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {props.navigation.goBack()}}
        >
            <Text style={styles.optionButtonText}>
                Back to menu
            </Text>
        </TouchableOpacity>
    </View>
);

MainMenuSettingsFooter.propTypes = {
    navigation: PropTypes.object,
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#222',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#444',
        paddingTop: 40,
        paddingBottom: 15,
    },
    optionButton: {
        height: 44,
        backgroundColor: '#333',
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
    },
    optionButtonText: {
        color: '#999',
        fontWeight: '900',
        padding: 3,
    },
});

export default MainMenuSettingsFooter;
