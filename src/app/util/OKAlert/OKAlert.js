import React, { Component } from 'react';
import { Alert } from 'react-native';
import strings from '../../../res/strings/Strings';

export async function OkAlert(alert_title,alert_message) {
    Alert.alert(
        alert_title, alert_message,
        [
            { text: strings.AlertOK, style: 'cancel' }
        ],
        { cancelable: true }
    )
}
 