import React, { Component, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import { ENDED, } from './../../utility/constants';
import { formatMiliseconds, formatTime, } from './../../utility/format';

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previousTime: Date.now(),
            elapsedTime: props.elapsedTime,
            gameEndedStop: true,
        };
    }

    static propTypes = {
        gameStatus: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        running: PropTypes.bool.isRequired,
        elapsedTime: PropTypes.number.isRequired,
        updateElapsedTimeDispatcher: PropTypes.func.isRequired,
        updateTimeRunningDispatcher: PropTypes.func.isRequired,
        myRef: PropTypes.func.isRequired,
        showTimerAlert: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.myRef(this);
        this.interval = setInterval(this.onTick);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onStart = () => {
        const timeLimit = formatMiliseconds(this.props.time);
        this.setState({
            previousTime: Date.now(),
            timeLimit,
        });
        this.props.updateTimeRunningDispatcher(true);
    };

    onStop = () => {
        this.props.updateTimeRunningDispatcher(false);
        if (this.state.timeLimit) {
            this.props.updateElapsedTimeDispatcher(this.state.timeLimit);
        } else {
            this.props.updateElapsedTimeDispatcher(this.state.elapsedTime);
        }

    };

    onReset = () => {
        this.setState({
            elapsedTime: 0,
            previousTime: Date.now(),
        });
        this.props.updateElapsedTimeDispatcher(0);
    };

    onTick = () => {
        if (this.props.running) {
            const now = Date.now();
            this.setState({
                elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
                previousTime: Date.now(),
            });
        }
        if (this.props.running && this.state.elapsedTime >= this.state.timeLimit) {
            this.onStop();
            this.setState({ elapsedTime: this.state.timeLimit,}, this.props.showTimerAlert());
        } else if (this.props.gameStatus === ENDED && this.state.gameEndedStop) {
            this.setState({ gameEndedStop: false,});
            this.onStop();
        } else if (this.props.gameStatus !== ENDED && !this.state.gameEndedStop) {
            this.setState({ gameEndedStop: true,});
        }
    };

    formatNumberLength = (num, length) => {
        let number = num.toString();
        while (number.length < length) {
            number = `0${number}`;
        }
        return number;
    }

    getTime = () => {
        return this.state.elapsedTime;
    };

    render() {
        return (
            <View style={styles.stopwatch}>
                <Text style={styles.stopwatchTitle}>STOPWATCH</Text>
                <Text style={styles.stopwatchTimer}>{formatTime(this.state.elapsedTime)}</Text>
                <View style={[styles.timerButtons,]}>
                    {   this.props.running ?
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
                <Text style={styles.timeLimitLabel}>Alert will go off at {this.props.time}</Text>
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
        marginBottom: 5,
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
