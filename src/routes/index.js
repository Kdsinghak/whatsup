import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from '../screens/onBoarding/login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/onBoarding/splashScreens';
import ScreenNames from '../utils/ScreenNames';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={SplashScreen} name={ScreenNames.SPLASH} />
        <Stack.Screen component={Login} name={ScreenNames.LOGIN} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;

const styles = StyleSheet.create({});
