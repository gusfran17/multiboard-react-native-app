import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { Icon, } from 'react-native-elements';
import PropTypes from 'prop-types';

const PositionsTable = props => {
    const playersListComponet = props.players.map((player, index) => {
        return (
            <View key={index} style={styles.detail}>
                <Text style={[ styles.col1, styles.label, ]}>{index+1}</Text>
                <Text style={[ styles.col2, styles.label, ]}>{player.name}</Text>
                <Text style={[ styles.col3, styles.label, ]}>{player.score}</Text>
            </View>
        );
    });
    return (
        <View style={styles.positionsTable}>
            <View style={styles.detail}>
                <Text style={[ styles.col1, styles.titleLabel, ]}>Rank</Text>
                <Text style={[ styles.col2, styles.titleLabel, ]}>Name</Text>
                <Text style={[ styles.col3, styles.titleLabel, ]}>Score</Text>
            </View>
            {playersListComponet}
        </View>
    );
}

PositionsTable.propTypes = {
    players: PropTypes.array.isRequired,
}


const styles = StyleSheet.create({
    positionsTable: {
        alignSelf: 'stretch',
        paddingTop: 10,
        paddingBottom: 30,
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
        textAlign: 'left',
        flex: 1,
    },
});

export default PositionsTable;
