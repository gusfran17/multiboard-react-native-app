import React, { Component, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, } from 'react-native-elements';

class AddPlayerComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { name: "", };
    }

    static propTypes = {
        addPlayer: PropTypes.func.isRequired,
        checkGameStatus: PropTypes.func.isRequired,
        isValidPlayer: PropTypes.func.isRequired,
        showPlayersInfoReading: PropTypes.bool.isRequired,
    }

    addPlayer = () => {
        if (this.props.isValidPlayer(this.state.name)) {
            this.props.addPlayer(this.state.name);
            this.props.checkGameStatus();
        }
        this.setState({name:"",});

    }

    showPlayersInfoReading = () => {
        if (this.props.showPlayersInfoReading) {
            return <Text style={styles.playersInfoReading}>Tap on a player to see his details.</Text>
        }
    }

    render(){
        return (
            <View style={styles.addPlayerContainer}>
                {this.showPlayersInfoReading()}
                <View style={styles.addPlayerForm}>
                    <TextInput
                        style={styles.addPlayerInput}
                        value={this.state.name}
                        onChangeText={ name => {
                            this.setState({name,});
                        }}
                        onSubmitEditing={this.addPlayer}
                        onBlur={() => { if (this.state.name) this.addPlayer();}}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    >
                    </TextInput>
                    <TouchableOpacity
                        style={styles.addPlayerButton}
                        onPress={this.addPlayer}>
                        <Text style={styles.addPlayerButtonText}>
                            ADD PLAYER
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    addPlayerContainer: {
        backgroundColor: '#222',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 10,
        paddingBottom: 25,
    },
    addPlayerForm: {
        flexDirection: 'row',
        paddingBottom: 20,
    },
    addPlayerInput: {
        flex: 4,
        height: 40,
        backgroundColor: '#333',
        marginLeft: 10,
        marginRight: 5,
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        color: '#999',
        letterSpacing: 2,
    },
    addPlayerButton: {
        flex: 2,
        backgroundColor: '#333',
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 10,
        marginTop: 20,
        borderRadius: 10,
        paddingTop: 11,
        paddingLeft: 5,
        paddingRight: 5,
        alignContent: 'stretch',
        alignItems: 'stretch',
    },
    addPlayerButtonText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#999',
        fontWeight: '900',
    },
    playersInfoReading: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 12,
        margin: 0,
        padding: 0,
        color: '#FFF',
    },
});

export default AddPlayerComponent;
