import React, { Component, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import { ENDED, } from './../../utility/constants';

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            previouseTime: 0,
            elapsedTime: 0,
        };
    }

    static propTypes = {
        timed: PropTypes.bool.isRequired,
        time: PropTypes.string.isRequired,
        showTimerAlert: PropTypes.func.isRequired,
        gameStatus: PropTypes.string.isRequired,
        showGameEndedAlert: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.interval = setInterval(this.onTick);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.checkAlarmInterval);

    }

    onStart = () => {
        const timeParts = this.props.time.split(':');
        const minutes = Number(timeParts[0]);
        const seconds = Number(timeParts[1]);
        const timeLimit = ((minutes*60) + seconds)*1000;
        this.setState({
            running: true,
            previousTime: Date.now(),
            timeLimit,
        });
        if (this.props.timed) {
            this.checkAlarmInterval = setInterval(this.checkTimeStatus, 100);
        }
    };

    onStop = () => {
        this.setState({
            running: false,
        });
        clearInterval(this.checkAlarmInterval);
    };

    onReset = () => {
        this.setState({
            elapsedTime: 0,
            previousTime: Date.now(),
        });
        clearInterval(this.checkAlarmInterval);
    };

    onTick = () => {
        if (this.state.running) {
            if (this.props.gameStatus !== ENDED) {
                const now = Date.now();
                this.setState({
                    elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
                    previousTime: Date.now(),
                });
            } else {
                this.onStop();
                this.props.showGameEndedAlert();
            }
        }
    };

    formatNumberLength = (num, length) => {
        let number = num.toString();
        while (number.length < length) {
            number = `0${number}`;
        }
        return number;
    }

    timeLimit = () => {
        if (this.props.timed) {
            return <Text style={styles.timeLimitLabel}>Alert will go of at {this.props.time}</Text>;
        }
    }

    checkTimeStatus = () => {
        if (this.state.elapsedTime >= this.state.timeLimit) {
            this.onStop();
            this.setState({ elapsedTime: this.state.timeLimit,});
            this.props.showTimerAlert();
        }
    }

    render() {
        const minutes = this.formatNumberLength(Math.floor((this.state.elapsedTime / 60000) % 60), 2);
        const seconds = this.formatNumberLength(Math.floor((this.state.elapsedTime / 1000) % 60), 2);
        return (
            <View style={styles.stopwatch}>
                <Text style={styles.stopwatchTitle}>STOPWATCH</Text>
                <Text style={styles.stopwatchTimer}>{minutes}:{seconds}</Text>
                <View style={[styles.timerButtons, {marginBottom: this.props.timed? 5: 15,},]}>
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
                            <Text style={styles.timerButtonText}>Start</Text>
                        </TouchableOpacity>
                    }


                    <TouchableOpacity
                        style={[styles.timerButton, styles.timerButtonRight,]}
                        onPress={this.onReset}
                    >
                        <Text style={styles.timerButtonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
                {this.timeLimit()}
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
    timeLimitLabel: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 12,
        margin: 0,
        padding: 0,
        color: '#FFF',
        marginBottom: 10,
    },
});

export default Stopwatch;
