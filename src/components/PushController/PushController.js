import React, { Component, } from 'react';
import PushNotification from 'react-native-push-notification';
import { View, } from 'react-native';

class PushController extends Component {

    componentDidMount() {
        PushNotification.configure({
            onNotification: notification => {
                console.log('NOTIFICATION: ', notification);
                notification.finish((...args)=>{console.log(args)});
            },
        });
    }

    render() {
        return <View></View>;
    }
}

export default PushController;
