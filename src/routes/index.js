import React, {useEffect, useRef} from 'react';
import {AppState, StatusBar} from 'react-native';
import Home from '../screens/home/Home';
import ScreenNames from '../utils/ScreenNames';
import OTP from '../screens/onBoarding/otp/OTP';
import Login from '../screens/onBoarding/login';
import Profile from '../screens/settings/profile';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/onBoarding/splashScreens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatRoom from '../screens/chat/ChatRoom';

import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const appState = useRef(AppState.currentState);
  const {userId} = useSelector(store => store.userDetailsReducer);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        firestore().collection('Users').doc(userId).update({
          status: 'online',
        });
      } else {
        firestore().collection('Users').doc(userId).update({
          status: 'offline',
        });
      }
      console.log('nextAppState', nextAppState);

      appState.current = nextAppState;
      console.log('qwedfghjkl;/', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
        <Stack.Screen component={ChatRoom} name={ScreenNames.CHATROOM} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
