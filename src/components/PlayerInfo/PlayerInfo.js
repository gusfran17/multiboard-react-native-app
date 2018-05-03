import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { Icon, } from 'react-native-elements';
import PropTypes from 'prop-types';
import Detail from './Detail';
import { WON, LOST, PLAYING, } from './../../utility/constants';
import { formatDate, } from './../../utility/format';

const PlayerInfo = props => {
    let playerDetailsComponents;
    if (props.player) {
        return (
            <View style={[ styles.playerInfo, ]}>
                <Text style={styles.name}>{props.player.name}</Text>
                <Detail
                    label="Score:"
                    value={props.player.score.toString()}
                />
                <Detail
                    label="Rank:"
                    value={props.player.rank.toString()}
                />
                <Detail
                    label="Status:"
                    value={props.player.status}
                />
                <Detail
                    label="Created:"
                    value={formatDate(props.player.created)}
                />
                <Detail
                    label="Updated:"
                    value={formatDate(props.player.updated)}
                />
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={()=>{props.selectPlayer(-1)}}
                >
                    <Text style={styles.closeButtonText}>
                        CLOSE
                    </Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (<View/>);
    }
}

PlayerInfo.propTypes = {
    player: PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        status: PropTypes.oneOf([ WON, LOST, PLAYING, ]).isRequired,
        created: PropTypes.object.isRequired,
        updated: PropTypes.object,
    }),
    selectPlayer: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    playerInfo: {
        position: 'absolute',
        top: 75,
        zIndex: 10,
        width: 300,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
        borderColor: '#444',
        borderWidth: 3,
        borderRadius: 15,
        paddingBottom: 10,
    },
    name: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        paddingTop: 30,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '900',
        fontSize: 20,
    },
    closeButton: {
        flex: 2,
        backgroundColor: '#333',
        marginTop: 20,
        marginBottom: 25,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: '#999',
        fontWeight: '900',
    },
});

export default PlayerInfo;
