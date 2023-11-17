import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignUp({ onNavigate }) {
    const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const openHome = () => {
    navigation.navigate('Entry');
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
        <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
        

      <Button title="Sign In with Google" onPress={() => console.log('Continue with Google')} />
      <Button title="Continue with Email" onPress={() => console.log('Continue with Email')} />
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

export default SignUp;
