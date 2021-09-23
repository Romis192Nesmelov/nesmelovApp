import React, { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, FlatList, Text, TouchableOpacity, SafeAreaView, View, ImageBackground, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { gStyle } from '../styles/style';
import { gVars } from './gVars';
import Loader from './Loader';

export default function Works({ route }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lightbox, setLightbox] = useState(false);
    
    const window = Dimensions.get('window');
    const [windowSize, setWindowSize] = useState({ 
        'width': window.width,
        'height': window.height
    });

    const openUrl = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`${url} данный URL временно недоступен`);
        }
    };
  
    const fetchData = async () => {
        const resp = await fetch(gVars.host + '/api/branches?id=' + route.params.id, {
            method: 'GET'
        });
        const data = await resp.json();
        const newData = [];
        // console.log(data.data);
        setData(data.data);
        setLoading(true);
    };

    useEffect(() => {
        fetchData();
        Dimensions.addEventListener('change', ({window:{width,height}}) => {
            setWindowSize({
                'width': width,
                'height': height
            });
        });
    }, []);
    
    if (loading) {
        return (
            <SafeAreaView style={gStyle.container}>
                <ImageBackground source={require('../assets/black.png')} resizeMode="cover" style={
                    gStyle.bgImage,
                    { 
                        width: lightbox ? windowSize.width : 0,
                        height: lightbox ? windowSize.height - 60 : 0,
                        position: 'absolute',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        left: 0,
                        zIndex: 999
                    }
                }>
                    <Ionicons name="close-circle" size={30} style={styles.iconClose} onPress={() => {
                        // document.body.style.overflow = 'scroll';
                        setLightbox(false);
                    }} />
                    <Image style={styles.fullImg} source={{ uri: lightbox ? lightbox : gVars.host + '/images/black.png' }} />
                </ImageBackground>
                
                <Text style={styles.head}>{ route.params.rus }</Text>
                <Text style={styles.description}>{ route.params.description }</Text>
                <FlatList data={data} renderItem={({item}) => (
                    <TouchableOpacity style={styles.previewContainer} onPress={() => {
                        if (route.params.id == 2) {
                            openUrl(item.url);
                        } else if (route.params.id == 5) {
                            openUrl(gVars.host + '/' + item.url);
                        } else {
                            // console.log(item);
                            // document.body.style.overflow = 'hidden';
                            setLightbox(gVars.host + '/' + item.full);
                        }
                    }}>
                        <Image style={styles.previewImg} source={{ uri: gVars.host + '/' + item.preview }} />    
                    </TouchableOpacity>
                )} numColumns={2} keyExtractor={(item) => item.id.toString()} />
            </SafeAreaView>
        );
    } else {
        return (
            <Loader />
        );
    }
}

const styles = StyleSheet.create({
    head: {
        fontSize: 23,
        color: '#696969',
        fontFamily: 'jura-bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5
    },
    description: {
        fontSize: 17,
        color: '#696969',
        fontFamily: 'jura-medium',
        textAlign: 'center',
        marginBottom: 10
    },
    previewContainer: {
        flex: 1,
        height: 150,
        borderWidth: 2,
        borderColor: '#e18f00'
    },
    previewImg: {
        width: '100%',
        height: 150,
        resizeMode: 'cover'
    },
    fullImg: {
        width: '95%',
        height: 320,
        resizeMode: 'contain'
    },
    iconClose: {
        position: 'absolute',
        right: 5,
        top: 5,
        color: 'white'
    }
  });