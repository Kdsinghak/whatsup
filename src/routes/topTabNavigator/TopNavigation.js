import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chats from '../../screens/home/Chats';
import ScreenNames from '../../utils/ScreenNames';
import Status from '../../screens/home/Status';
import Colors from '../../utils/Colors';
import {Text, StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {...styles.statusBarStyle},
        tabBarLabel: ({focused}) => {
          return (
            <Text style={focused ? styles.focused : styles.notFocused}>
              {route.name}
            </Text>
          );
        },
        tabBarIndicatorStyle: {backgroundColor: Colors.GREEN},
      })}>
      <Tab.Screen name={ScreenNames.CHATS} component={Chats} />
      <Tab.Screen name={ScreenNames.STATUS} component={Status} />
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  statusBarStyle: {
    backgroundColor: 'transparent',
  },
  focused: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.GREEN,
    textTransform: 'uppercase',
  },
  notFocused: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
    textTransform: 'uppercase',
  },
});
