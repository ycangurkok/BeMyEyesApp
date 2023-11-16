import React from 'react';
import EntryPage from "./app/screens/index";
import CameraComponent from './app/screens/camera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Entry" component={EntryPage} />
        <Stack.Screen name="Camera" component={CameraComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}