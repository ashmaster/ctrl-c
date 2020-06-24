

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Qr from './screens/Qr';
import Send from './screens/Send';
import CameraScreen from './screens/CameraScreen';

const Stack = createStackNavigator()
class App extends React.Component{
  
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator> 
          <Stack.Screen
          name="Scanner"
          component={Qr}
          options={{
          title: 'Scanner',
          headerStyle: {
            backgroundColor: '#011830',
          },
          headerTintColor: '#63e8a8',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
          />
          <Stack.Screen name="Send" component={Send} options={{
          title: 'Send',
          headerStyle: {
            backgroundColor: '#011830',
          },
          headerTintColor: '#63e8a8',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} options={{
          title: 'Camera',
          header: () => {return null}
        }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  
});

export default App;
