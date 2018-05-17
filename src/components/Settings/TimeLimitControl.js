import React, { Component,} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';

class TimeLimitControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: props.time,
            editing: false,
        };
    }

    static propTypes = {
        time: PropTypes.string.isRequired,
        updateTimedGame: PropTypes.func.isRequired,
        showWrongTimeAlert: PropTypes.func.isRequired,
    };

    onChanged = text => {
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

    onBlur = () => {
        this.setState({ editing: false,});
        this.updateTime();
    }

    onFocus = () => {
        this.inputRef.focus();
        this.setState({ editing: true,});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <TextInput
                        ref={input => { this.inputRef = input }}
                        keyboardType="numeric"
                        style={styles.value}
                        value={this.state.time.toString()}
                        onChangeText={text=> this.onChanged(text)}
                        onSubmitEditing={this.updateTime}
                        onKeyPress={() => { if (Platform.OS === 'ios') this.setState({ time:'...', });}}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    <TouchableOpacity
                        style={styles.edit}
                        onPress={this.onFocus}
                    >
                        <Icon
                            name={this.state.editing? "done":"edit"}
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignSelf: 'stretch',
        height: 54,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#2b2b2b',
    },
    innerContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 54,
        alignItems: 'center',
        backgroundColor: '#2b2b2b',
    },
    value: {
        textAlign: 'center',
        fontWeight: '900',
        color: '#FFF',
    },
    edit: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
});

export default TimeLimitControl;
