import React, { Component, } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, } from 'react-native';
import PropTypes from 'prop-types';
import { Alert, } from './../';
import { Scoreboard, } from './../../utility/constants';
import GamesTable from './GamesTable';
import { StatefullAnimatedButton, } from './../Button';
import { GrowToHeight, } from './../Animation';

class SavedGames extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoadAlert: false,
            showRemoveAlert: false,
            index: -1,
            deletedGame: '',
        }
    }

    static propTypes = {
        savedGames: PropTypes.array.isRequired,
        navigation: PropTypes.object.isRequired,
        loadGameDispatcher: PropTypes.func.isRequired,
        removeGameDispatcher: PropTypes.func.isRequired,
        activeGameNotSaved: PropTypes.bool.isRequired,
    }

    static navigationOptions = ({ navigation, }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: null,
            headerStyle: {
                backgroundColor: '#ff00ff00',
                height: 65,
                borderBottomWidth: 0,
            },
            headerTintColor: '#fff',
        };
    };

    loadGame = index => {
        if (this.props.activeGameNotSaved) {
            this.setState({ index: index, showLoadAlert: true, });
            this.forceUpdate();
        } else {
            this.setState({ index: index, showLoadAlert: false, }, this.confirmLoadGame);
        }
    }

    confirmLoadGame = () => {
        if (this.state.index >= 0) {
            this.props.loadGameDispatcher(this.props.savedGames[this.state.index], this.state.index);
            this.props.navigation.navigate(Scoreboard);
        }
        this.hideLoadAlert();
    }

    hideLoadAlert = () => {
        this.setState({ ...this.state,showLoadAlert: false, });
    }

    removeGame = index => {
        this.setState({ index: index, showRemoveAlert: true, deletedGame: this.props.savedGames[index].gameName,});
    }

    confirmRemoveGame = () => {
        if (this.state.index >= 0) {
            this.props.removeGameDispatcher(this.state.index);
        }
        this.hideRemoveAlert();
    }

    hideRemoveAlert = () => {
        this.setState({ ...this.state, showRemoveAlert: false, });
    }

    render() {
        return (
            <ImageBackground
                style={[ styles.container, ]}
                source={require('./../../assets/images/dark_dice.png')}>
                <GrowToHeight
                    height={250}
                    delay={200}
                    style={animatedContainerStyle}>
                    <View style={[ styles.savedGamesContainer, ]}>
                        <Text style={styles.title}>Saved Games</Text>
                        <GamesTable
                            savedGames={this.props.savedGames}
                            navigation={this.props.navigation}
                            loadGame={this.loadGame}
                            removeGame={this.removeGame}
                            activeGameNotSaved={this.props.activeGameNotSaved}
                        />
                        <StatefullAnimatedButton
                            onPress={() => {this.props.navigation.goBack()}}
                            text="Back to menu"
                            width={140}
                            delay={900}
                        />
                    </View>
                </GrowToHeight>
                <Alert
                    show={this.state.showLoadAlert}
                    showProgress={true}
                    title="Game in progress"
                    message="Doing this you'll lose your game in progress. Do you want to load this game anyway?"
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Yes"
                    onCancelPressed={() => {
                        this.hideLoadAlert();
                    }}
                    onConfirmPressed={() => {
                        this.confirmLoadGame();
                    }}
                />
                <Alert
                    show={this.state.showRemoveAlert}
                    showProgress={false}
                    title="Remove game"
                    message={`Are you sure you want to delete this game?`}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Yes"
                    onCancelPressed={() => {
                        this.hideRemoveAlert();
                    }}
                    onConfirmPressed={() => {
                        this.confirmRemoveGame();
                    }}
                />
            </ImageBackground>
        );
    }
}

const animatedContainerStyle = {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        marginTop: -80,
    },
    savedGamesContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#22222299',
        borderRadius: 20,
        paddingBottom: 30,
        marginTop: 60,
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
        padding: 30,
    },
});

export default SavedGames;
