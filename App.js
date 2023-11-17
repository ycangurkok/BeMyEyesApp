import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EntryPage from "./app/screens/index";
import CameraComponent from './app/screens/camera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpPage from './app/screens/signUp';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    checkSignInStatus();
  }, []);

  const checkSignInStatus = async () => {
    try {
      await AsyncStorage.setItem('userToken', "asdf")
      // Retrieve the user's authentication token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');

      // Check if the token exists
      if (token) {
        // User is signed in
        setIsSignedIn(true);
      } else {
        // User is not signed in
        setIsSignedIn(false);
      }
    } catch (error) {
      console.error('Error checking sign-in status:', error);
    }
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUpPage} />
        
        {isSignedIn ? (
          <Stack.Screen name="Camera" component={CameraComponent} />
        ) : (
          <Stack.Screen name="Entry" options={{ headerShown: false, title: 'Home'}}  component={EntryPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}