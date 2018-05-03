import React from 'react';
import { Icon, } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';

const NavigationBar = props => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
            </View>
            {
                props.showControls?
                    <View style={styles.settingsContainer}>
                        <TouchableOpacity
                            style={styles.settings}
                            onPress={() => { if (props.playersAmount > 0) props.updateDisplayStatsDispatcher(true)}}>
                            <Icon
                                size={30}
                                name='list'
                                color="#fff">
                            </Icon>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.settings}
                            onPress={() => {props.navigation.navigate('Settings')}}>
                            <Icon
                                size={30}
                                name='settings'
                                color="#fff">
                            </Icon>
                        </TouchableOpacity>
                    </View>: undefined
            }

        </View>
    );
}

NavigationBar.propTypes = {
    playersAmount: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    updateDisplayStatsDispatcher: PropTypes.func.isRequired,
    navigation: PropTypes.object,
    showControls: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 55,
    },
    titleContainer: {
        width: 220,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
    },
    settingsContainer: {
        flexDirection: 'row',
    },
    settings: {
        backgroundColor: '#333',
        paddingLeft: 8,
        paddingRight: 8,
        marginLeft: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default NavigationBar;
