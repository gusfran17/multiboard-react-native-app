import React from 'react';
import { Animated, ScrollView, StyleSheet, } from 'react-native';
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
            <Animated.ScrollView
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                style={{
                    transform: [{ scale: scale, }, {perspective: 1000, },],
                    opacity: scale,
                    ...this.props.style,
                }}
            >
                {this.props.children}
            </Animated.ScrollView>
        );
    }
}

export default GrowToScrollView;
