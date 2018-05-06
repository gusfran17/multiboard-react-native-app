import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, } from 'react-native';
import PropTypes from 'prop-types';
import GamesTable from './GamesTable';
import { NavigationBar, } from './../../containers';
import { StatefullAnimatedButton, } from './../Button';

const SavedGames = props => {
    return (
        <ImageBackground
            style={[ styles.container, ]}
            source={require('./../../assets/images/dark_dice.png')}>
            <View style={[ styles.savedGamesContainer, ]}>
                <Text style={styles.title}>Saved Games</Text>
                <GamesTable
                    savedGames={props.savedGames}
                    navigation={props.navigation}
                    loadGame={props.loadGameDispatcher}
                    activeGameNotSaved={props.activeGameNotSaved}
                />
                <StatefullAnimatedButton
                    onPress={() => {props.navigation.goBack()}}
                    text="Back to menu"
                    width={140}
                />
            </View>
        </ImageBackground>
    );
}

SavedGames.propTypes = {
    savedGames: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    loadGameDispatcher: PropTypes.func.isRequired,
    activeGameNotSaved: PropTypes.bool.isRequired,
}

SavedGames.navigationOptions = ({ navigation, }) => {
    const params = navigation.state.params || {};
    return {
        headerTitle: <NavigationBar
            navigation={navigation}
            showControls={false}
            title="MULTIBOARD"
        />,
        headerStyle: {
            backgroundColor: '#ff00ff00',
            height: 65,
            borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9a9',
        padding: 15,
        marginTop: -80,
    },
    savedGamesContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#22222299',
        borderRadius: 20,
        paddingBottom: 30,
        marginTop: 90,
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
