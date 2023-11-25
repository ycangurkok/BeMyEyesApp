import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

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

        <Text style={styles.text}>BeMyEyes</Text>
    
        <View style={styles.container}>

            <TouchableOpacity onPress={openSignIn} style={[styles.googleButton, styles.buttonSpacing]}>
            <Text style={styles.buttonText}>Sign In with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openSignIn} style={styles.mailButton}>
            <Text style={styles.mailButtonText}>Continue with Email</Text>
            </TouchableOpacity>

        </View>


          <Button title="Don't have an account? Sign Up" style={styles.link} onPress={openSignUp} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000000',
    marginBottom: 0,
  },
  link: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#58CECE'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    
  },
  googleButton: {
    height: 57,
    width: 355,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#58CECE',
    marginBottom: 0,
  },
  mailButton: {
    height: 57,
    width: 355,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#171717',
    marginBottom: 0,
  },
  mailButtonText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  buttonSpacing: {
    marginBottom: 25,
  },
  text: {
    justifyContent: 'flex-start',
    width: 392,
    height: 208,
    padding: 100,
    fontSize: 44,
    color: 'white',
  },
  image: {
    width: 100,
    height: 100, 
  }
});

export default FirstPage;
