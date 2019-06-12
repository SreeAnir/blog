

import { Dimensions } from 'react-native';

export const HEIGHT = Dimensions.get('window').height;

export const WIDTH = Dimensions.get('window').width;

export let regexForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export let regexForNumbers = /^[0-9]*$/;


export function isEmpty(value) {
    for (var x in value) {
        return false
    }
    return true
}

export function isNull(value) {
    if(value!=null){
        return false
    }
    return true
}
