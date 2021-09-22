import React from 'react';
import { StyleSheet, ImageBackground, View, Image } from 'react-native';
import { gStyle } from '../styles/style';
import { gVars } from './gVars';

export default function Loader() {
    return (
        <View style={gStyle.container}>
            <ImageBackground source={require('../assets/light-grey-bg.jpg')} resizeMode="cover" style={gStyle.bgImage}>
                <Image style={styles.loader} source={require('../assets/loader.gif')} />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    loader: {
        width: 60,
        height: 60
    }
});