import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraComponent from './app/screens/camera';
import VideoComponent from './app/screens/video';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpPage from './app/screens/signUp';
import WelcomePage from './app/screens/welcome';
import SignInPage from './app/screens/signIn';
import HomePage from "./app/screens/home";
import SettingsPage from "./app/screens/settings";
import WhereAmIPage from "./app/screens/whereAmI";
import Redirector from "./app/screens/redirector";
import StreamScreen from './app/screens/hat';
import { LogBox } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  LogBox.ignoreAllLogs();

  useEffect(() => {
    checkSignInStatus();
  }, []);

  const checkSignInStatus = async () => {
    try {
      // Retrieve the user's authentication token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      setIsSignedIn(!!token);
    } catch (error) {
      console.error('Error checking sign-in status:', error);
    }
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: 'none' }}>
      <Stack.Screen name="Redirector" options={{headerShown: false}} component={Redirector} />

          <Stack.Screen name="Welcome" options={{headerShown: false, title: "Welcome"}} component={WelcomePage} />

          <Stack.Screen name="Home" component={HomePage} options={{headerShown: true, title: "HOME"}}/>
          
          <Stack.Screen name="SignUp" options={{headerShown: false, title: "Sign Up"}} component={SignUpPage} />

          <Stack.Screen name="SignIn" options={{headerShown: false, title: "Sign In"}} component={SignInPage} />

          <Stack.Screen name="Camera" options={{headerShown: true, title: "Camera"}} component={CameraComponent} />

          <Stack.Screen name="Video" options={{headerShown: true, title: "Video"}} component={VideoComponent} />
 
          <Stack.Screen name="Settings"   component={SettingsPage} />

          <Stack.Screen name="WhereAmI"   component={WhereAmIPage} />

          <Stack.Screen name="StreamScreen"   component={StreamScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}