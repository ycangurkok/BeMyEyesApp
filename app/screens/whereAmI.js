import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function WhereAmI({ onNavigate }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#000', // Set the header background color
      },
      headerTintColor: '#fff', // Optional: Set the header text and icons color
    });
  }, [navigation]);


  const openSignUp = () => {
    navigation.navigate('SignUp');
  };


  const handleEmailChange = (email) => {
    setEmail(email);
    setEmailError(null);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setPasswordError(null);
  };

  const handleSignIn = () => {
    let e_error = false;
    let p_error = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      e_error = true;
      setEmailError("Invalid email address!");
    }
    if (password.length < 6 || !/\d/.test(password)) {
      p_error = true;
      setPasswordError('Password must be at least 6 characters and include at least one number');
    }
    if (p_error || e_error) {
      return;
    }
    // Here you would usually send the email and password to your server
    console.log('Sign Up with', email, password);
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return (
    <View style={styles.container}>



      <View style={styles.row}>

        <TouchableOpacity onPress={() => openCamera('Describe Scene')} style={styles.button}>
          <Text style={styles.buttonText}>Open In Google Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openCamera('Count Money')} style={styles.button}>
          <Text style={styles.buttonText}>Share Location</Text>
        </TouchableOpacity>

      </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%', // Tüm genişliği kaplaması için
    marginBottom: 100,
    alignItems: 'center',

  },
  googleButton: {
    height: 67,
    width: 355,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 40,
    backgroundColor: 'gray',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  button: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    width: 180,
    height: 72,
    borderRadius: 15,
    marginBottom: 55,
    justifyContent: 'center',
    padding: 10,
    width: 300,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
  headerText: {
    justifyContent: 'flex-start',
    width: 392,
    height: 208,
    padding: 100,
    fontSize: 44,
    color: 'white',
    marginBottom: 55,
  
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  signInLink: {
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#58CECE'
  },
  link: {
    justifyContent: 'flex-end',
    backgroundColor: '#58CECE'
  },

});

export default WhereAmI;
