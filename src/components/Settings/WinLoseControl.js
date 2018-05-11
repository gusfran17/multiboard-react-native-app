import React from 'react';
import { StyleSheet, Text, View, Switch, } from 'react-native';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';

const winColor =  '#9d9';
const loseColor = '#f99';

const WinLoseControl = props => {
    const loseStyle = !props.maxScoreWins? styles.noDisplay: null;
    const winStyle = props.maxScoreWins? styles.noDisplay: null;
    return (
        <View style={styles.value}>
            <Text
                style={ [styles.valueLabel, styles.valueLabelLose, ]}
                onPress={()=>{props.toggleWinLose(false)}}
            >l{"\n"}o{"\n"}s{"\n"}e</Text>
            <View style={styles.switchContainer}>
                <Switch
                    style={styles.switchComponent}
                    onTintColor="#efe"
                    tintColor="#f33"
                    thumbTintColor={props.maxScoreWins? '#7f7':'#f77'}
                    value={props.maxScoreWins}
                    onValueChange={() => {props.toggleWinLose(!props.maxScoreWins)}}
                />
            </View>
            <Text
                style={[styles.valueLabel, styles.valueLabelWin, ]}
                onPress={()=>{props.toggleWinLose(true)}}
            >w{"\n"}i{"\n"}n</Text>
        </View>
    );
}

WinLoseControl.propTypes = {
    maxScoreWins: PropTypes.bool.isRequired,
    toggleWinLose: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    valueLabel: {
        width: 40,
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 13,
        paddingRight: 13,
        marginLeft: 0,
        marginRight: 0,
        fontWeight: '900',
        alignSelf: 'stretch',
    },
    valueLabelWin: {
        color: winColor,
        borderColor: winColor,
        borderWidth: 1,
        paddingTop: 12,
        height: 79,
    },
    valueLabelLose: {
        color: loseColor,
        borderColor: loseColor,
        borderWidth: 1,
    },
    value: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#2b2b2b',
    },
    switchContainer: {
        flex: 1,
        alignSelf: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    switchComponent: {
        alignSelf: 'center',
    },
    noDisplay: {
        display: 'none',
    },
});

export default WinLoseControl;
