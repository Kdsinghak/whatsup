import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chats from '../../screens/home/Chats';
import ScreenNames from '../../utils/ScreenNames';
import Status from '../../screens/home/Status';
import Colors from '../../utils/Colors';
import {Text} from 'react-native';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarPressColor: 'transparent',
        tabBarStyle: {backgroundColor: 'transparent'},
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={
                focused
                  ? {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: Colors.GREEN,
                      textTransform: 'uppercase',
                    }
                  : {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: Colors.BLACK,
                      textTransform: 'uppercase',
                    }
              }>
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
