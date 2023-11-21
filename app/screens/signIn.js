import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignIn({ onNavigate }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

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
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}


    <View style={styles.container}>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignIn;
