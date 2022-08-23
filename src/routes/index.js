import React from 'react';
import {StatusBar} from 'react-native';
import Home from '../screens/home/Home';
import ScreenNames from '../utils/ScreenNames';
import OTP from '../screens/onBoarding/otp/OTP';
import Login from '../screens/onBoarding/login';
import Profile from '../screens/settings/profile';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/onBoarding/splashScreens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatRoom from '../screens/chat/ChatRoom';
const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          component={SplashScreen}
          name={ScreenNames.SPLASH}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          component={Login}
          name={ScreenNames.LOGIN}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          component={OTP}
          name={ScreenNames.OTP}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          component={Profile}
          name={ScreenNames.PROFILE}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          component={Home}
          name={ScreenNames.HOME}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
