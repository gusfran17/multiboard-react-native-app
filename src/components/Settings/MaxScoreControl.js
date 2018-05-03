import React, { Component,} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, } from 'react-native';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';

class MaxScoreControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newScore: props.maxScore,
            newScoreRefresh: props.maxScore,
        };
    }

    static propTypes = {
        maxScore: PropTypes.number.isRequired,
        updateMaxScore: PropTypes.func.isRequired,
    };

    onChanged = (text, inputRef) => {
        let numbers = '0123456789';
        let valid = true;
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) === -1 ) {
                valid = false;
            }
        }
        if (!valid) {
            alert('Please enter only numbers.');
            inputRef.clear();
        }
        const newScore = Number(text.replace(/[^0-9]/g, ''));
        this.setState({ newScore, });
    }

    addToMaxScore = delta => {
        this.props.updateMaxScore(this.props.maxScore+delta);
        this.setState({ newScore: (this.state.newScore + delta), });
    }

    render() {
        let inputRef;
        return (
            <View style={styles.counter}>
                <TouchableOpacity
                    style={styles.updateScoreMinus}
                    onPress={() => { this.addToMaxScore(-1);}}
                >
                    <Text style={styles.updateScoreIcon}>-</Text>
                </TouchableOpacity>
                <View style={styles.scoreValue}>
                    <TextInput
                        ref={input => { inputRef = input }}
                        keyboardType="numeric"
                        style={styles.scoreValueText}
                        value={this.state.newScore.toString()}
                        onChangeText={text=> this.onChanged(text, inputRef)}
                        onKeyPress={() => {console.log('onKeyPress', this.state); this.setState({newScore: '...',})}}
                        onSubmitEditing={() =>{ this.props.updateMaxScore(this.state.newScore)}}
                    />
                </View>
                <TouchableOpacity
                    style={styles.updateScorePlus}
                    onPress={() => { this.addToMaxScore(1);}}
                >
                    <Text style={styles.updateScoreIcon}>+</Text>
                </TouchableOpacity>
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
        backgroundColor: '#ef5350',
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateScorePlus: {
        width: 40,
        backgroundColor: '#66bb6a',
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

export default MaxScoreControl;
