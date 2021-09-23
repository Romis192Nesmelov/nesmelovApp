import React from 'react';
import { StyleSheet } from 'react-native';
import Main from './components/Main';
import Works from './components/Works';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name="Main"
                component={Main}
                options={
                    {
                        title: 'Главная',
                        headerTitleStyle: styles.navTitle,
                        headerStyle: styles.navBar,
                    }
                }
            />
            <Stack.Screen 
                name="Works"
                component={Works}
                options={
                    {
                        title: 'Портфолио',
                        headerTitleStyle: styles.navTitle,
                        headerStyle: styles.navBar,
                    }
                }
            />
        </Stack.Navigator>
    </NavigationContainer>
}

const styles = StyleSheet.create({
    navTitle: {
      fontSize: 16,
      fontFamily: 'jura-bold',
      color: '#696969',
      marginBottom: 3
    },
    navBar: {
        borderBottomWidth: 4,
        borderBottomColor: '#e18f00'
    }
  });