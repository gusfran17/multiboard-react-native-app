import React, { Component, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Animated, } from 'react-native';
import PropTypes from 'prop-types';
import RNExitApp from 'react-native-exit-app';
import { Alert, } from './../';
import { NewGameSettings, Scoreboard, SavedGames, } from './../../utility/constants';
import { StatefullAnimatedButton, } from './../Button';

class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bringMenusAnimationOne: new Animated.Value(-120),
            bringMenusAnimationTwo: new Animated.Value(800),
            springAnimation1: 1400,
            springAnimation2: 1650,
            springAnimation3: 1900,
            springAnimation4: 2150,
            springAnimation5: 2400,
            showGameInProgressAlert: false,
        };
    }

    static propTypes = {
        navigation: PropTypes.object,
        activeGame: PropTypes.object.isRequired,
        maxScore: PropTypes.number.isRequired,
        maxScoreWins: PropTypes.bool.isRequired,
        savedGames: PropTypes.array.isRequired,
        edited: PropTypes.bool.isRequired,
    }

    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: null,
            header: null,
        };
    };

    componentDidMount() {
        this.startAnimation();
        this.setState({ key: Math.random(), });
    }

    startAnimation = () => {
        const bounciness = 12;
        const speed = 2;
        const delay = 250;
        const delayOffset = 1400;
        Animated.parallel([
            Animated.timing(
                this.state.bringMenusAnimationOne,
                {
                    toValue: 70,
                    duration: 400,
                    delay: delayOffset - 700,
                    useNativeDriver: true,
                }
            ),
            Animated.timing(
                this.state.bringMenusAnimationTwo,
                {
                    delay: delayOffset - 600,
                    toValue: 100,
                    duration: 600,
                    useNativeDriver: true,
                }
            ),
        ]).start();
    }

    startNewGame = () => {
        if (this.props.edited) {
            this.setState({...this.state, showGameInProgressAlert: true, });
        } else {
            this.props.navigation.navigate(NewGameSettings);
        }
    }

    hideGameInProgressAlert = () => {
        this.setState({...this.state, showGameInProgressAlert: false, });
    }

    continueGame = animation => {
        if (this.props.edited) {
            return (
                <StatefullAnimatedButton
                    onPress={() => {this.props.navigation.navigate(Scoreboard)}}
                    delay={animation}
                    text="Continue game"
                    width={250}
                />
            );
        }
    }

    savedGames  = animation => {
        if (this.props.savedGames.length > 0) {
            return (
                <StatefullAnimatedButton
                    onPress={() => {this.props.navigation.navigate(SavedGames)}}
                    delay={animation}
                    text="Saved Games"
                    width={250}
                />
            );
        }
    }

    render() {
        let { bringMenusAnimationOne, bringMenusAnimationTwo, springAnimation1, springAnimation2, springAnimation3, springAnimation4, } = this.state;
        let edited = this.props.edited;
        let savedGames = this.props.savedGames.length > 0;
        let animationSavedGameButton = !edited? springAnimation2: springAnimation3;
        let animationExitButton = edited && savedGames? springAnimation4: !edited && !savedGames? springAnimation2: springAnimation3;
        return (
            <View
                style={styles.container}>
                <Image
                    source={require('./../../assets/images/cards_dices.png')}
                    style={[StyleSheet.absoluteFill,{flex:1, height: undefined, width: undefined,},]}
                    resizeMode="cover"/>
                <Animated.View style={{...titleContainer, transform: [{ translateY: bringMenusAnimationOne, },], }}>
                    <Text style={styles.title}>
                      MULTIBOARD
                    </Text>
                </Animated.View>
                <Animated.View style={{...menuContainer, transform: [{ translateY: bringMenusAnimationTwo, },], }}>
                    <Text style={styles.header}>Main Menu</Text>
                    <View style={styles.body}>
                        <StatefullAnimatedButton
                            onPress={this.startNewGame}
                            delay={springAnimation1}
                            text="New Game"
                            width={250}
                        />
                        {this.continueGame(springAnimation2)}
                        {this.savedGames(animationSavedGameButton)}
                        <StatefullAnimatedButton
                            onPress={() => {RNExitApp.exitApp();}}
                            delay={animationExitButton}
                            text="Exit"
                            width={250}
                        />
                    </View>
                </Animated.View>
                <Alert
                    show={this.state.showGameInProgressAlert}
                    showProgress={false}
                    title="Unsaved game"
                    message="There is a game in progress. Do you want to start a new game anyway?"
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Yes"
                    onCancelPressed={() => {
                        this.hideGameInProgressAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideGameInProgressAlert();
                        this.props.navigation.navigate(NewGameSettings);
                    }}
                />
            </View>
        );
    }
}

const titleContainer = {
    alignSelf: 'stretch',
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#222',
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
};

const menuContainer = {
    alignSelf: 'stretch',
    paddingBottom: 60,
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#222',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#000',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
        padding: 40,
    },
    body: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
    },
});

export default MainMenu;
