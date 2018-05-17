import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import PropTypes from 'prop-types';

const CustomAlert = props => (
    <View style={styles.overlayContainer}>
        <View style={styles.overlay}/>
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.message}>{props.message}</Text>
            <TouchableOpacity
                style={styles.confirmButton}
                onPress={props.onConfirmPressed}>
                <Text style={styles.confirmButtonText}>
                    {props.confirmText}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);

CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string,
    confirmText: PropTypes.string.isRequired,
    onConfirmPressed: PropTypes.func.isRequired,
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
        backgroundColor: '#222',
        opacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        borderRadius: 10,
        backgroundColor: '#555',
        padding: 15,
        width: 250,
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        color: '#FFF',
        fontWeight: '900',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 15,
    },
    message: {
        color: '#FFF',
        fontWeight: '400',
        fontSize: 15,
    },
    confirmButton: {
        marginTop: 15,
        marginBottom: 5,
        backgroundColor: "#77CC77",
        padding: 7,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: "#FFF",
        fontWeight: '900',
    },
});

export default CustomAlert;
