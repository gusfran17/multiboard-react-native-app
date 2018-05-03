import React, { Component, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            previouseTime: 0,
            elapsedTime: 0,
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.onTick);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onStart = () => {
        this.setState({
            running: true,
            previousTime: Date.now(),
        });
    };

    onStop = () => {
        this.setState({
            running: false,
        });
    };

    onReset = () => {
        this.setState({
            elapsedTime: 0,
            previousTime: Date.now(),
        });
    };

    onTick = () => {
        if (this.state.running) {
            const now = Date.now();
            this.setState({
                elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
                previousTime: Date.now(),
            });
        }
    };

    formatNumberLength = (num, length) => {
        let number = num.toString();
        while (number.length < length) {
            number = `0${number}`;
        }
        return number;
    }

    render() {
        const minutes = this.formatNumberLength(Math.floor((this.state.elapsedTime / 60000) % 60), 2);
        const seconds = this.formatNumberLength(Math.floor((this.state.elapsedTime / 1000) % 60), 2);
        const miliseconds = this.formatNumberLength(Math.floor((this.state.elapsedTime / 10) % 100), 2);
        return (
            <View style={styles.stopwatch}>
                <Text style={styles.stopwatchTitle}>STOPWATCH</Text>
                <Text style={styles.stopwatchTimer}>{minutes}:{seconds}:{miliseconds}</Text>
                <View style={styles.timerButtons}>
                    {   this.state.running ?
                        <TouchableOpacity
                            style={[styles.timerButton, styles.timerButtonLeft,]}
                            onPress={this.onStop}
                        >
                            <Text style={styles.timerButtonText}>Stop</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={[styles.timerButton, styles.timerButtonLeft,]}
                            onPress={this.onStart}
                        >
                            <Text style={styles.timerButtonText}>Sart</Text>
                        </TouchableOpacity>
                    }


                    <TouchableOpacity
                        style={[styles.timerButton, styles.timerButtonRight,]}
                        onPress={this.onReset}
                    >
                        <Text style={styles.timerButtonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    stopwatch: {
        flex: 3,
        backgroundColor: '#2f2f2f',
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingLeft: 1,
        paddingRight: 3,
    },
    stopwatchTitle: {
        textAlign: 'center',
        color: '#999',
        fontSize: 13,
        letterSpacing: 2,
        fontWeight: 'normal',
    },
    stopwatchTimer: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 13,
        letterSpacing: 2,
        fontWeight: '900',
        marginTop: 15,
        marginBottom: 10,
    },
    timerButtons: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    timerButton: {
        flex: 1,
        backgroundColor: '#222',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    timerButtonLeft: {
        marginLeft: 10,
        marginRight: 2,
    },
    timerButtonRight: {
        marginLeft: 2,
        marginRight: 10,
    },
    timerButtonText: {
        color: '#999',
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        letterSpacing: 2,
        fontWeight: '900',
        fontSize: 12,
    },
});

export default Stopwatch;
