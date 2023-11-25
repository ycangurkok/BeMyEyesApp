import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraComponent from './app/screens/camera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpPage from './app/screens/signUp';
import FirstPage from './app/screens/firstScreen';
import SignInPage from './app/screens/signIn';
import HomePage from "./app/screens/home";
import SettingsPage from "./app/screens/settings";
import WhereAmIPage from "./app/screens/whereAmI";

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
          <Stack.Screen name="First" options={{headerShown: false, title: "First"}} component={FirstPage} />

          <Stack.Screen name="SignUp" options={{headerShown: false, title: "Sign Up"}} component={SignUpPage} />

          <Stack.Screen name="SignIn" options={{headerShown: false, title: "Sign In"}} component={SignInPage} />

          <Stack.Screen name="Camera" options={{headerShown: false, title: "Camera"}} component={CameraComponent} />

          <Stack.Screen name="Home"   component={HomePage} />
 
          <Stack.Screen name="Settings"   component={SettingsPage} />

          <Stack.Screen name="WhereAmI"   component={WhereAmIPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}