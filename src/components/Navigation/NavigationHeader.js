import React, { Component, } from 'react';
import { Icon, } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Animated, } from 'react-native';
import PropTypes from 'prop-types';

class NavigationHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animation1: new Animated.Value(200),
        }
    }

    componentDidMount() {
        Animated.spring(
            this.state.animation1,
            {
                toValue: 0,
                speed: 1,
                bounciness: 8,
                useNativeDriver: true,

            }
        ).start();                        // Starts the animation
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
    }
    render() {
        let { animation1, } = this.state;
        return (
            <View style={styles.container}>
                <Animated.View style={{ transform: [{ translateY: animation1, },],}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    titleContainer: {
        width: 220,
        padding:10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#333',
        marginBottom: 0,
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
    },
});

export default NavigationHeader;
