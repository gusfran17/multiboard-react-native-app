import React, { Component, } from 'react';
import { Icon, } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Animated, ActivityIndicator, } from 'react-native';
import PropTypes from 'prop-types';

class RightHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animation1: new Animated.Value(-200),
            animation2: new Animated.Value(-200),
        }
    }

    componentDidMount() {
        Animated.parallel([
            Animated.spring(
                this.state.animation1,
                {
                    toValue: 0,
                    speed: 2,
                    bounciness: 10,
                    delay: 400,
                    useNativeDriver: true,
                }
            ),
            Animated.spring(
                this.state.animation2,
                {
                    toValue: 0,
                    speed: 2,
                    bounciness: 10,
                    delay: 800,
                    useNativeDriver: true,
                }
            ),
        ]).start();                // Starts the animation
    }

    static propTypes = {
        playersAmount: PropTypes.number.isRequired,
        updateDisplayStatsDispatcher: PropTypes.func.isRequired,
        navigation: PropTypes.object,
        playerInfoDisplayed: PropTypes.bool.isRequired,
        running: PropTypes.bool.isRequired,
    }

    render() {
        let { animation1, animation2, } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.toolsContainer}>
                    <Animated.View style={{ transform: [{ translateY: animation1, },],}}>
                        <TouchableOpacity
                            style={styles.tool}
                            onPress={() => { if (this.props.playersAmount > 0) this.props.updateDisplayStatsDispatcher(!this.props.playerInfoDisplayed)}}>
                            <Icon
                                size={30}
                                name='list'
                                color={this.props.playersAmount > 0? '#fff': '#666' }>
                            </Icon>
                        </TouchableOpacity>
                    </Animated.View>
                    {this.props.running?
                        <ActivityIndicator size="small" style={styles.activityIndicator} color="#FFF" />
                        :null
                    }
                    <Animated.View style={{ transform: [{ translateY: animation2, },],}}>
                        <TouchableOpacity
                            style={styles.tool}
                            onPress={() => {this.props.navigation.navigate('Settings')}}>
                            <Icon
                                size={30}
                                name='settings'
                                color="#fff">
                            </Icon>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    toolsContainer: {
        flexDirection: 'row',
        marginRight: 15,
    },
    tool: {
        backgroundColor: '#333',
        padding: 8,
        marginLeft: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    activityIndicator: {
        backgroundColor: '#333',
        padding: 12,
        marginLeft: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        right: 0,
        zIndex: 1000,
    },
});

export default RightHeader;
