import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainStack from './navigate';

const fonts = () => Font.loadAsync({
  'jura-bold': require('./assets/fonts/Jura-Bold.ttf'),
  'jura-medium': require('./assets/fonts/Jura-Medium.ttf'),
  'jura-light': require('./assets/fonts/Jura-Light.ttf')
});

export default function App() {
  const [font, setFont] = useState(false);

  if (font) {
    return (
      <MainStack />
    );
  } else {
    return (
      <AppLoading 
        startAsync={fonts} 
        onFinish={() => setFont(true)}
        onError={console.warn}
      />
    )
  }
}