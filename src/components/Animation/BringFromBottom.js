import React from 'react';
import { Animated, ScrollView, } from 'react-native';
import PropTypes from 'prop-types';

class BringFromBottom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bringUp: new Animated.Value(800),
        }
    }

    static propTypes = {
        children: PropTypes.array,
    }

    componentDidMount() {
        Animated.timing(
            this.state.bringUp,
            {
                toValue: 100,
                delay: 300,
            }
        ).start();
    }

    render() {
        let { bringUp, } = this.state;

        return (
            <Animated.ScrollView                 // Special animatable View
                style={{
                    marginTop: bringUp,
                    alignSelf: 'stretch',         // Bind opacity to animated value
                }}
            >
                {this.props.children}
            </Animated.ScrollView>
        );
    }
}

export default BringFromBottom;
