import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, } from 'react-native';
import { Icon, } from 'react-native-elements';
import PropTypes from 'prop-types';
import { formatDateShort, } from './../../utility/format';
import { Scoreboard, } from './../../utility/constants';

const PositionsTable = props => {
    const loadGame = index => {
        if (props.activeGameNotSaved) {
            Alert.alert(
                'Load game',
                'You hava a game in progress. If you load this game you will lose all your unsaved data. Are you want to do this?',
                [
                    {
                        text: 'Cancel', onPress: () => {},
                    },
                    {
                        text: 'OK', onPress: () => {
                            props.loadGame(index);
                            props.navigation.navigate(Scoreboard);
                        },
                    },
                ],
                { cancelable: false, }
            );
        } else {
            props.loadGame(index);
            props.navigation.navigate(Scoreboard);
        }
    }

    const gamesListComponet = props.savedGames.map((game, index) => {
        return (
            <View key={index} style={styles.detail}>
                <Text style={[ styles.col1, styles.label, ]}>{formatDateShort(game.saved)}</Text>
                <Text style={[ styles.col2, styles.label, ]}>{game.gameName}</Text>
                <TouchableOpacity
                    onPress={()=>{loadGame(game)}}
                    style={[ styles.col3Load, styles.button, ]}>
                    <Icon size={25} name="slideshow" color='#fff'/>
                </TouchableOpacity>
            </View>
        );
    });
    return (
        <View style={styles.gamesTable}>
            <View style={styles.detail}>
                <Text style={[ styles.col1, styles.titleLabel, ]}>Last Saved</Text>
                <Text style={[ styles.col2, styles.titleLabel, ]}>Name</Text>
                <Text style={[ styles.col3, styles.titleLabel, ]}></Text>
            </View>
            {gamesListComponet}
        </View>
    );
}

PositionsTable.propTypes = {
    savedGames: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    loadGame: PropTypes.func.isRequired,
    activeGameNotSaved: PropTypes.bool.isRequired,
}


const styles = StyleSheet.create({
    gamesTable: {
        alignSelf: 'stretch',
        paddingTop: 10,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 30,
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '600',
    },
    titleLabel: {
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
    },
    col1: {
        textAlign: 'left',
        flex: 3,
    },
    col2: {
        textAlign: 'left',
        flex: 4,
    },
    col3: {
        textAlign: 'left',
        flex: 1,
    },
    col3Load: {
        flex: 1,
    },
});

export default PositionsTable;
