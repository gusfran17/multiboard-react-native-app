import React, { Component, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, Animated, } from 'react-native';
import PropTypes from 'prop-types';
import { NewGameSettings, Scoreboard, SavedGames, } from './../../utility/constants';
import { AnimatedButton, } from './../Button';

class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bringMenusAnimationOne: new Animated.Value(-70),
            bringMenusAnimationTwo: new Animated.Value(800),
            springAnimation1: new Animated.Value(0),
            springAnimation2: new Animated.Value(0),
            springAnimation3: new Animated.Value(0),
            springAnimation4: new Animated.Value(0),
            springAnimation5: new Animated.Value(0),
        }
    }

    static propTypes = {
        navigation: PropTypes.object,
        activeGame: PropTypes.object.isRequired,
        maxScore: PropTypes.number.isRequired,
        maxScoreWins: PropTypes.bool.isRequired,
        savedGames: PropTypes.array.isRequired,
    }

    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: null,
            header: null,
        };
    };

    componentDidMount() {
        const bounciness = 12;
        const speed = 2;
        const delay = 250;
        const delayOffset = 1400;
        Animated.sequence([
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
                Animated.spring(
                    this.state.springAnimation1,
                    {
                        delay: delayOffset,
                        toValue: 1,
                        speed,
                        bounciness,
                        useNativeDriver: true,
                    }
                ),
                Animated.spring(
                    this.state.springAnimation2,
                    {
                        delay: delayOffset + delay,
                        toValue: 1,
                        speed,
                        bounciness,
                        useNativeDriver: true,
                    }
                ),
                Animated.spring(
                    this.state.springAnimation3,
                    {
                        delay: delayOffset + (delay*2),
                        toValue: 1,
                        speed,
                        bounciness,
                        useNativeDriver: true,
                    }
                ),
                Animated.spring(
                    this.state.springAnimation4,
                    {
                        delay: delayOffset + (delay*3),
                        toValue: 1,
                        speed,
                        bounciness,
                        useNativeDriver: true,
                    }
                ),
                Animated.spring(
                    this.state.springAnimation5,
                    {
                        delay: delayOffset + (delay*4),
                        toValue: 1,
                        speed,
                        bounciness,
                        useNativeDriver: true,
                    }
                ),
            ]),
        ]).start();
    }

    startNewGame = () => {
        if (this.props.activeGame.edited) {
            Alert.alert(
                'New game',
                'If you don´t save your game in progress you´ll lose all your data. Are you want to do this?',
                [
                    {
                        text: 'Cancel', onPress: () => {},
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.props.navigation.navigate(NewGameSettings);
                        },
                    },
                ],
                { cancelable: false, }
            );
        } else {
            this.props.navigation.navigate(NewGameSettings);
        }
    }

    continueGame = animation => {
        if (this.props.activeGame.edited) {
            return (
                <AnimatedButton
                    onPress={() => {this.props.navigation.navigate(Scoreboard)}}
                    animation={animation}
                    text="Continue game"
                    width={250}
                />
            );
        }
    }

    savedGames  = animation => {
        if (this.props.savedGames.length > 0) {
            return (
                <AnimatedButton
                    onPress={() => {this.props.navigation.navigate(SavedGames)}}
                    animation={animation}
                    text="Saved Games"
                    width={250}
                />
            );
        }
    }

    render() {
        let { bringMenusAnimationOne, bringMenusAnimationTwo, springAnimation1, springAnimation2, springAnimation3, springAnimation4, } = this.state;
        let edited = this.props.activeGame.edited;
        let savedGames = this.props.savedGames.length > 0;
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
                        <AnimatedButton
                            onPress={this.startNewGame}
                            animation={springAnimation1}
                            text="New Game"
                            width={250}
                        />
                        {this.continueGame(springAnimation2)}
                        {this.savedGames(!edited? springAnimation2: springAnimation3)}
                        <AnimatedButton
                            onPress={() => {this.props.navigation.navigate(NewGameSettings)}}
                            animation={edited && savedGames? springAnimation4: !edited && !savedGames? springAnimation2: springAnimation3}
                            text="Exit"
                            width={250}
                        />
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const titleContainer = {
    alignSelf: 'stretch',
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 20,
};

const menuContainer = {
    alignSelf: 'stretch',
    paddingBottom: 60,
    borderRadius: 20,
    backgroundColor: '#222',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#000',
        padding: 15,
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
