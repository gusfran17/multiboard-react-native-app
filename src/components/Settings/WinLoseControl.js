import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,} from 'react-native';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';

const winColor =  '#9d9';
const loseColor = '#f99';

const WinLoseControl = props => {
    return (
        <View style={styles.container} >
            <View style={styles.innerContainer} >
                <Text onPress={props.showWinLoseOptions} style={styles.value}>{props.maxScoreWins? "WIN" : "LOSE"}</Text>
                <TouchableOpacity
                    style={styles.edit}
                    onPress={props.showWinLoseOptions}
                >
                    <Icon size={20} name="edit" color="#FFF"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

WinLoseControl.propTypes = {
    maxScoreWins: PropTypes.bool.isRequired,
    showWinLoseOptions: PropTypes.func.isRequired,
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

export default WinLoseControl;
