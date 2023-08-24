import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import User_tag from './User_tag';
import User_tag2 from './User_tag copy';





const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={User_tag} />
      <Stack.Screen name="Notifications" component={User_tag2} />
      
    </Stack.Navigator>
  );
}

export default function New_pG() {
  return (
    <NavigationContainer independent={true}>
      <MyStack />
    </NavigationContainer>
  );
}
