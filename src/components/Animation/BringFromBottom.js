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
        children: PropTypes.node,
        style: PropTypes.object,
        delay: PropTypes.number,
    }

    componentDidMount() {
        Animated.timing(
            this.state.bringUp,
            {
                toValue: 100,
                delay: this.props.delay? this.props.delay:300,
                useNativeDriver: true,
            }
        ).start();
    }

    render() {
        let { bringUp, } = this.state;

        return (
            <Animated.ScrollView
                style={{
                    transform: [{ translateY: bringUp, },],
                    alignSelf: 'stretch',
                    ...this.props.style,
                }}
            >
                {this.props.children}
            </Animated.ScrollView>
        );
    }
}

export default BringFromBottom;
