import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, FlatList, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { gStyle } from '../styles/style';
import { gVars } from './gVars';
import Loader from './Loader';

export default function Main({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
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
            )} keyExtractor={(item) => item.id.toString()} />
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
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  icon: {
    flex: 1,
    width: 80,
    height: 80
  },
  text: {
    fontSize: 20,
    fontFamily: 'jura-bold',
    color: '#696969',
    textAlign: 'center'
  }
});