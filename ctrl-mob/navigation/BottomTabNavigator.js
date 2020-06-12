import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import {Text } from 'react-native'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route),headerTitleAlign:'left',headerStyle: {
    backgroundColor: '#022140',
  },
  headerTintColor: '#fff',
});

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        tabBarOptions = {{
          activeBackgroundColor:'#022140'}
          }
        component={HomeScreen}
        options={{
          title: 'Scanner',
          tabBarLabel:({focused})=>
          <Text style = {{color:focused?'#81efdf':'#000',fontSize:22,fontWeight:'bold',marginBottom:'5%'}}>Scanner</Text>
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          tabBarLabel:({focused})=>
          <Text style = {{color:focused?'#81efdf':'#000',fontSize:22,fontWeight:'bold',marginBottom:'5%'}}>Paste</Text>
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Scan QrCode';
    case 'Links':
      return 'Paste Text';
  }
}
