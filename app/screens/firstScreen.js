import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function FirstPage({ onNavigate }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const openSignUp = () => {
    navigation.navigate('SignUp');
  };

  const openSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleSignUp = () => {
    // Here you would usually send the email and password to your server
    console.log('Sign Up with', email, password);
  };

  return (

    
    <View style={styles.container}>
    
        <View style={styles.container}>
            <TouchableOpacity onPress={openSignIn} style={styles.button}>
            <Text style={styles.buttonText}>Sign In with Google</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <TouchableOpacity onPress={openSignIn} style={styles.button}>
            <Text style={styles.buttonText}>Continue with Email</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <TouchableOpacity onPress={openSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    height: 57,
    width: 355,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#58CECE'
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
});

export default FirstPage;
