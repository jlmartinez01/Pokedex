
import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import {colorPrimario, } from '../utils/designSystem';

export default function Spinner({isLoading}) {

    return (
            <ActivityIndicator animating={isLoading} color={colorPrimario} style={styles.activityIndicatorView} size='large' />
    );
}


const styles = StyleSheet.create({
    activityIndicatorView:{
        position:'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0
    }

});

