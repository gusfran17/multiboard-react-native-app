import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, } from 'react-native';
import { Icon, } from 'react-native-elements';
import PropTypes from 'prop-types';
import { formatDateShort, } from './../../utility/format';
import { Scoreboard, } from './../../utility/constants';
import { GrowToHeight, } from './../Animation';
import { sortSavedGames, } from './../../utility/sort';

const PositionsTable = props => {
    const loadGame = (game,index) => {
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
                            props.loadGame(game, index);
                            props.navigation.navigate(Scoreboard);
                        },
                    },
                ],
                { cancelable: false, }
            );
        } else {
            props.loadGame(game, index);
            props.navigation.navigate(Scoreboard);
        }
    }

    const removeGame = (index, gameName) => {
        Alert.alert(
            `Remove game "${gameName}"`,
            'Are you sure that you want to delete this game?',
            [
                {
                    text: 'Cancel', onPress: () => {},
                },
                {
                    text: 'OK', onPress: () => {
                        props.removeGame(index);
                    },
                },
            ],
            { cancelable: false, }
        );

    }

    const getGamesListComponet = savedGames => {
        const gamesListComponet = savedGames.map((savedGame, index) => {
            return (
                <View key={savedGame.index} style={styles.detail}>
                    <Text style={[ styles.col1, styles.label, ]}>{formatDateShort(savedGame.data.saved)}</Text>
                    <Text style={[ styles.col2, styles.label, ]}>{savedGame.data.gameName}</Text>
                    <TouchableOpacity
                        onPress={()=>{removeGame(savedGame.index, savedGame.data.gameName)}}
                        style={[ styles.col3Load, styles.button, ]}>
                        <Icon size={30} name="delete" color='#fff'/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{loadGame(savedGame, savedGame.index)}}
                        style={[ styles.col3Load, styles.button, ]}>
                        <Icon size={30} name="slideshow" color='#fff'/>
                    </TouchableOpacity>
                </View>
            );
        });
        return gamesListComponet;
    }

    const getSortedGamesListComponent = () => {
        const gamesWithIndex = [];
        for (let i = 0; i < props.savedGames.length; i++) {
            let savedGame = {...props.savedGames[i],};
            savedGame.index = i;
            gamesWithIndex.push(savedGame);
        }
        const sortedSavedGames = sortSavedGames(gamesWithIndex);
        return getGamesListComponet(sortedSavedGames);
    }


    return (
        <View style={{alignSelf: 'stretch', marginBottom: 30,}}>
            <View style={styles.gamesTableHeader}>
                <View style={styles.detail}>
                    <Text style={[ styles.col1, styles.titleLabel, ]}>Last Saved</Text>
                    <Text style={[ styles.col2, styles.titleLabel, ]}>Name</Text>
                    <Text style={[ styles.col3, styles.titleLabel, ]}></Text>
                    <Text style={[ styles.col3, styles.titleLabel, ]}></Text>
                </View>
            </View>
            <GrowToHeight
                height={props.savedGames.length > 3? props.savedGames.length * 40: 120}
                delay={200}
                style={gamesTable}>
                {getSortedGamesListComponent()}
            </GrowToHeight>
        </View>
    );
}

PositionsTable.propTypes = {
    savedGames: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    loadGame: PropTypes.func.isRequired,
    removeGame: PropTypes.func.isRequired,
    activeGameNotSaved: PropTypes.bool.isRequired,
}

const gamesTable = {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 30,
};


const styles = StyleSheet.create({
    gamesTableHeader: {
        alignSelf: 'stretch',
        paddingTop: 10,
        paddingBottom: 0,
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
        fontSize: 17,
        textDecorationLine: 'underline',
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
