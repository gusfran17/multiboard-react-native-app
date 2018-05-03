import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { Icon, } from 'react-native-elements';
import PropTypes from 'prop-types';

const Detail = props => {
    return (
        <View style={styles.detail}>
            <Text style={styles.detailLabel}>{props.label}</Text>
            <Text style={styles.detailValue}>{props.value}</Text>
        </View>
    );
};

Detail.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    detail: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailLabel: {
        flex: 1,
        textAlign: 'right',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '600',
        fontSize: 12,
    },
    detailValue: {
        flex: 1,
        textAlign: 'left',
        color: '#999',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: '300',
        fontSize: 12,
    },
});

export default Detail;
