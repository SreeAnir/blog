import React, { Component } from 'react';

let Base;
let BaseImage;
let BaseUrl;

if (__DEV__) {
     BaseUrl = 'https://prontolo.digitalforest.it' ;
     Base = 'https://prontolo.digitalforest.it/api/graphql' ;
     BaseImage = 'http://192.168.1.20';
   
} else {
    Base = 'https://prontolo.digitalforest.it/api/graphql';
    BaseUrl = 'https://prontolo.digitalforest.it';
    BaseImage = 'http://prontolo.zoondia.org';
}

export let BASE_URL = Base;
export let BASE_REQUEST = BaseUrl;
export let BASE_URL_IMAGE = BaseImage;
