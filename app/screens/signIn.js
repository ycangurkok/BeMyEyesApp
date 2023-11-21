import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignIn({ onNavigate }) {
    const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const openHome = () => {
    navigation.navigate('Home');
  };

  const openSignUp = () => {
    navigation.navigate('SignUp');
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
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
      />
             

    <View style={styles.container}>
        <TouchableOpacity onPress={openHome} style={styles.button}>
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
});

export default SignIn;
