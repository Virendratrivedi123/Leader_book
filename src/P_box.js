import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';









const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
     
      
   
      
    </Stack.Navigator>
  );
}

export default function P_box() {
  return (
    <NavigationContainer independent={true}>
      <MyStack />
    </NavigationContainer>
  );
}
