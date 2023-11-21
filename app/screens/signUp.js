import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignUp({ onNavigate }) {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const openSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    setEmailError(null);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setPasswordError(null);
  };

  const handleSignUp = () => {
    let e_error = false;
    let p_error = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Here you would usually send the email and password to your server
    if(!emailRegex.test(email)) {
      e_error = true;
      setEmailError("Invalid email address!");
    }
    if (password.length < 6 || !/\d/.test(password)) {
      p_error = true;
      setPasswordError('Password must be at least 6 characters and include at least one number');
      return;
    }
    if (p_error || e_error) {
      return;
    }
    console.log('Sign Up with', email, password);
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return (
    <View style={styles.container}>


      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleNameChange}
        value={name}
        autoCapitalize="none"
      />

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
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.container}>
        <TouchableOpacity onPress={openSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Already have an account? Sign In</Text>
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUp;
