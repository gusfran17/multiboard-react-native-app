import React from 'react';
import { Animated, View, StyleSheet, } from 'react-native';
import PropTypes from 'prop-types';

class GrowToScrollView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scale: new Animated.Value(0),
        }
    }

    static propTypes = {
        children: PropTypes.node,
        delay: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    }

    componentDidMount() {
        Animated.timing(
            this.state.scale,
            {
                toValue: 1,
                delay: this.props.delay,
                useNativeDriver: true,
            }
        ).start();
    }

    render() {
        let { scale, } = this.state;

        return (
            <Animated.View
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                style={{
                    transform: [{ scale: scale, }, {perspective: 1000, },],
                    opacity: scale,
                    ...this.props.style,
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default GrowToScrollView;
