import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import GamesTable from './GamesTable';
import { NavigationBar, } from './../../containers';

const SavedGames = props => {
    return (
        <View style={[ styles.container, ]}>
            <View style={[ styles.savedGamesContainer, ]}>
                <Text style={styles.title}>Saved Games</Text>
                <GamesTable
                    savedGames={props.savedGames}
                    navigation={props.navigation}
                    loadGame={props.loadGameDispatcher}
                    activeGameNotSaved={props.activeGameNotSaved}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {props.navigation.goBack()}}
                >
                    <Text style={styles.buttonText}>
                        Back to menu
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
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
            backgroundColor: '#9a9',
            height: 85,
        },
        headerTintColor: '#222',
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9a9',
        padding: 15,
    },
    savedGamesContainer: {
        flexDirection: 'column',
        backgroundColor: '#222',
        borderRadius: 20,
        paddingBottom: 30,
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
        padding: 40,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#333',
        margin: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#999',
        fontWeight: '900',
    },
});

export default SavedGames;
