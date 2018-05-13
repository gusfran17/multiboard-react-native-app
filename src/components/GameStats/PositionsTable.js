import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, } from 'react-native';
import { Icon, } from 'react-native-elements';
import PropTypes from 'prop-types';
import { GrowToHeight, } from './../Animation';
import { formatTime, } from './../../utility/format';
import { WON, LOST, PLAYING, } from './../../utility/constants';

const PositionsTable = props => {

    const timeColumnMaxScoreWins = player => {
        let elapsedTime;
        if (props.showTime) {
            if (player.status === WON) {
                elapsedTime = player.elapsedTime.toString();
            } else {
                elapsedTime = '---';
            }
        }
        return (
            <Text style={[ styles.col3, styles.label, ]}>
                {isNaN(elapsedTime)? elapsedTime:formatTime(elapsedTime)}
            </Text>
        );
    }

    const timeColumnMaxScoreLoses = (player, lastElapsedTime) => {
        let elapsedTime;
        if (props.showTime) {
            if (player.status === LOST) {
                elapsedTime = player.elapsedTime.toString();
            } else {
                elapsedTime = lastElapsedTime;
            }
        }
        return (
            <Text style={[ styles.col3, styles.label, ]}>
                {formatTime(elapsedTime)}
            </Text>
        );
    }

    const playersListComponet = props.players.map((player, index) => {
        return (
            <View key={index} style={styles.detail}>
                <Text style={[ styles.col1, styles.label, ]}>{index+1}</Text>
                <Text style={[ styles.col2, styles.label, ]}>{player.name}</Text>
                <Text style={[ styles.col3, styles.label, ]}>{player.score}</Text>
                {
                    props.maxScoreWins?
                        timeColumnMaxScoreWins(player)
                        :
                        timeColumnMaxScoreLoses(player, props.players[1].elapsedTime)
                }
            </View>
        );
    });

    return (
        <GrowToHeight
            height={props.players.length <= 4? (80+(props.players.length*50)):280}
            delay={0}
            style={animatedContainerStyle}>
            <View style={styles.positionsTable}>
                <View style={styles.detail}>
                    <Text style={[ styles.col1, styles.titleLabel, ]}>Rank</Text>
                    <Text style={[ styles.col2, styles.titleLabel, ]}>Name</Text>
                    <Text style={[ styles.col3, styles.titleLabel, ]}>Score</Text>
                    {
                        props.showTime?
                            <Text style={[ styles.col3, styles.titleLabel, ]}>Time</Text>
                            :
                            undefined
                    }
                </View>
                <ScrollView>
                    {playersListComponet}
                </ScrollView>
            </View>
        </GrowToHeight>
    );
}

PositionsTable.propTypes = {
    players: PropTypes.array.isRequired,
    showTime:  PropTypes.bool.isRequired,
    maxScoreWins:  PropTypes.bool.isRequired,
    time:  PropTypes.string.isRequired,
}

const animatedContainerStyle = {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 30,
    marginBottom: 0,
    alignContent: 'center',
    flexDirection: 'column',
}

const styles = StyleSheet.create({
    positionsTable: {
        alignSelf: 'stretch',
        paddingTop: 10,
        paddingBottom: 15,
        flexDirection: 'column',
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
        fontSize: 12,
    },
    titleLabel: {
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
        fontSize: 12,
    },
    col1: {
        textAlign: 'center',
        flex: 1,
    },
    col2: {
        textAlign: 'left',
        flex: 2,
    },
    col3: {
        textAlign: 'center',
        flex: 1,
    },
});

export default PositionsTable;
