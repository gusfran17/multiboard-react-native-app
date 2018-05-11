import React, { Component,} from 'react';
import { StyleSheet, Text, View, TextInput, } from 'react-native';
import PropTypes from 'prop-types';

class TimeLimitControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: props.time,
        };
    }

    static propTypes = {
        time: PropTypes.string.isRequired,
        updateTimedGame: PropTypes.func.isRequired,
        showWrongTimeAlert: PropTypes.func.isRequired,
    };

    onChanged = (text, inputRef) => {
        let time = this.formatTimeDisplay(text);
        this.setState({ time, });
    }

    formatTimeDisplay = time => {
        let result = time.replace(/[^0-9]/g, '');
        if (result.length > 4){
            result = result.substring(result.length-4,result.length);
        }
        const length = 4 - result.length;
        for (let i = 0; i < length; i++){
            result = `0${result}`;
        }
        const firstPart = result.substring(0,2);
        const secondPart = result.substring(2,4);
        result= `${firstPart}:${secondPart}`;
        return result;
    }

    isValidTime = time => {
        const isRightLength = time.length == 5;
        const isNumber = !isNaN(time.replace(':',''));
        const isInteger = Number.isInteger(Number(time.replace(':','')));
        const isSecondsAmountValid = Number(time.replace(':','').substring(2,4)) < 60;
        if (isRightLength && isNumber && isInteger && isSecondsAmountValid) {
            return true;
        }
        return false;
    }

    updateTime = () => {
        if (this.isValidTime(this.state.time)) {
            this.props.updateTimedGame(this.state.time);
        } else {
            this.setState({ time: this.props.time, });
            this.props.showWrongTimeAlert();
        };
    }

    render() {
        let inputRef;
        return (
            <View style={styles.counter}>
                <View style={styles.scoreValue}>
                    <TextInput
                        ref={input => { inputRef = input }}
                        keyboardType="numeric"
                        style={styles.scoreValueText}
                        value={this.state.time.toString()}
                        onChangeText={text=> this.onChanged(text, inputRef)}
                        onSubmitEditing={this.updateTime}
                        onKeyPress={() => {this.setState({ time:'...', })}}
                        onBlur={this.updateTime}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    counter: {
        flex: 2,
        flexDirection: 'row',
    },
    updateScoreMinus: {
        width: 40,
        backgroundColor: '#dd2323',
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateScorePlus: {
        width: 40,
        backgroundColor: '#33bb33',
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateScoreIcon: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
    },
    scoreValue: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    scoreValueText: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '900',
        fontSize: 15,
    },
});

export default TimeLimitControl;
