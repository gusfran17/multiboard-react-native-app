import React, { Component, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, } from 'react-native';
import PropTypes from 'prop-types';

const AnimatedButton = props => {
    return (
        <Animated.View style={{height: 58, width: props.width, alignSelf: 'center', transform: [{ scale: props.animation, }, {perspective: 1000, },], opacity: props.animation,}}>
            <TouchableOpacity
                style={styles.optionButton}
                onPress={props.onPress}
            >
                <Text style={styles.optionButtonText}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

AnimatedButton.propTypes = {
    animation: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
    optionButton: {
        height: 44,
        flex: 1,
        backgroundColor: '#333',
        marginBottom: 15,
        borderRadius: 10,
    },
    optionButtonText: {
        textAlign: 'center',
        color: '#999',
        fontWeight: '900',
        margin: 13,
    },
});

export default AnimatedButton;
