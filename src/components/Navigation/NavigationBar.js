import React, { Component, } from 'react';
import { Icon, } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Animated, } from 'react-native';
import PropTypes from 'prop-types';

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animation1: new Animated.Value(200),
            animation2: new Animated.Value(200),
            animation3: new Animated.Value(200),
        }
    }

    componentDidMount() {
        Animated.parallel([
            Animated.spring(
                this.state.animation1,
                {
                    toValue: 0,
                    speed: 1,
                    bounciness: 8,

                }
            ),
            Animated.spring(
                this.state.animation2,
                {
                    toValue: 0,
                    speed: 1,
                    bounciness: 10,
                    delay: 400,
                }
            ),
            Animated.spring(
                this.state.animation3,
                {
                    toValue: 0,
                    speed: 1,
                    bounciness: 10,
                    delay: 800,
                }
            ),
        ]).start();                        // Starts the animation
    }

    static propTypes = {
        playersAmount: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        updateDisplayStatsDispatcher: PropTypes.func.isRequired,
        navigation: PropTypes.object,
        showControls: PropTypes.bool.isRequired,
    }

    render() {
        let { animation1, animation2, animation3, } = this.state;
        return (

            <View style={styles.container}>
                <Animated.View style={{ bottom: animation1, }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>
                    </View>
                </Animated.View>
                {
                    this.props.showControls?
                        <View style={styles.settingsContainer}>
                            <Animated.View style={{ bottom: animation2, }}>
                                <TouchableOpacity
                                    style={styles.settings}
                                    onPress={() => { if (this.props.playersAmount > 0) this.props.updateDisplayStatsDispatcher(true)}}>
                                    <Icon
                                        size={30}
                                        name='list'
                                        color={this.props.playersAmount > 0? '#fff': '#666' }>
                                    </Icon>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={{ bottom: animation3, }}>
                                <TouchableOpacity
                                    style={styles.settings}
                                    onPress={() => {this.props.navigation.navigate('Settings')}}>
                                    <Icon
                                        size={30}
                                        name='settings'
                                        color="#fff">
                                    </Icon>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                        : undefined
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
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
    settingsContainer: {
        flexDirection: 'row',
    },
    settings: {
        backgroundColor: '#333',
        padding: 8,
        marginLeft: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default NavigationBar;
