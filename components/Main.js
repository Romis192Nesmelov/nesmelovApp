import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, FlatList, Text, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import { gStyle } from '../styles/style';
import { gVars } from './gVars';
import Loader from './Loader';

export default function Main({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const window = Dimensions.get('window');
  const [isPortrait, setOrientation] = useState(window.width <= window.height);

  const fetchData = async () => {
    const resp = await fetch(gVars.host + '/api/branches', {
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
      setOrientation(width <= height);
    });
  }, []);

  if (loading) {
    return (
        <SafeAreaView style={gStyle.container}>
          <ImageBackground source={require('../assets/light-grey-bg.jpg')} resizeMode="cover" style={gStyle.bgImage}>
            <FlatList style={{ padding: 20 }} contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}} data={data} renderItem={({item}) => (
              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Works', item)}>
                  <Image style={styles.icon} source={{ uri: gVars.host + '/' + item.icon }} />
                  <Text style={styles.text}>{ item.rus }</Text>
              </TouchableOpacity>
            )} horizontal={!isPortrait} keyExtractor={(item) => item.id.toString()} />
          </ImageBackground>
        </SafeAreaView>
    );
  } else {
    return (
      <Loader />
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 120,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    marginBottom: 3
  },
  icon: {
    // flex: 1,
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 14,
    fontFamily: 'jura-bold',
    color: '#696969',
    textAlign: 'center'
  }
});