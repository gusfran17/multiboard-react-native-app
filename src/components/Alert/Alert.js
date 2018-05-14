import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import PropTypes from 'prop-types';

const Alert = props => (
    <AwesomeAlert
        show={props.show}
        showProgress={props.showProgress}
        title= {props.title}
        message={props.message}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={props.showCancelButton}
        showConfirmButton={props.showConfirmButton}
        confirmText={props.confirmText}
        cancelText={props.cancelText}
        confirmButtonColor="#77CC77"
        cancelButtonColor="#CC7777"
        onConfirmPressed={props.onConfirmPressed}
        onCancelPressed={props.onCancelPressed}
        titleStyle={{ color: '#FFF', fontWeight: '900', }}
        messageStyle={{ color: '#FFF', fontWeight: '400', }}
        alertContainerStyle={{ borderRadius: 10, backgroundColor: '#2224',}}
        contentContainerStyle={{ borderRadius: 10, backgroundColor: '#555', padding: 15,}}
        cancelButtonTextStyle={{ color: '#FFF', fontWeight: '900', }}
        confirmButtonTextStyle={{ color: '#FFF', fontWeight: '900', }}
        cancelButtonStyle={{ margin: 10,}}
        confirmButtonStyle={{ margin: 10,}}
    />
);

Alert.propTypes = {
    show: PropTypes.bool.isRequired,
    showProgress: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    title: PropTypes.string,
    showCancelButton: PropTypes.bool.isRequired,
    showConfirmButton: PropTypes.bool.isRequired,
    confirmText: PropTypes.string.isRequired,
    cancelText: PropTypes.string,
    onConfirmPressed: PropTypes.func,
    onCancelPressed: PropTypes.func,
}

export default Alert;
