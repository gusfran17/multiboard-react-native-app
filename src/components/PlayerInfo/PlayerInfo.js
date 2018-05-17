import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { Icon, } from 'react-native-elements';
import PropTypes from 'prop-types';
import Detail from './Detail';
import { WON, LOST, PLAYING, } from './../../utility/constants';
import { formatDate, } from './../../utility/format';
import { StatefullAnimatedButton, } from './../Button';
import { GrowToHeight, } from './../Animation';

const PlayerInfo = props => {
    let playerDetailsComponents;
    if (props.player) {
        return (
            <View style={styles.overlayContainer}>
                <View style={styles.overlay}/>
                <View style={[ styles.playerInfo, ]}>
                    <GrowToHeight
                        height={350}
                        delay={0}
                        style={animatedContainerStyle}>
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
                        <View style={styles.closeButton}>
                            <StatefullAnimatedButton
                                onPress={()=>{props.selectPlayer(-1)}}
                                text="Close"
                                width={80}
                                delay={500}
                            />
                        </View>
                    </GrowToHeight>
                </View>
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
        created: PropTypes.string.isRequired,
        updated: PropTypes.object,
    }),
    selectPlayer: PropTypes.func.isRequired,
}

const animatedContainerStyle = {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 30,
    alignContent: 'center',
    flexDirection: 'column',
}

const styles = StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        zIndex: 10,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#666',
        opacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    playerInfo: {
        position: 'absolute',
        top: 160,
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
        marginTop: 30,
    },
});

export default PlayerInfo;
