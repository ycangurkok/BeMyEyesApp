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

       <Text style={styles.headerText}>BeMyEyes</Text>

      <View style={styles.container}>
        <TextInput
          style={styles.googleButton}
          onChangeText={handleEmailChange}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        <TextInput
          style={styles.googleButton}
          onChangeText={handlePasswordChange}
          value={password}
          placeholder="Enter your password"
          secureTextEntry
        />
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}


      
      <Button title="Sign In" style={styles.signInLink} onPress={handleSignIn} />
    </View>

    <Button title="Don't have an account? Sign Up" style={styles.link} onPress={openSignUp} />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  googleButton: {
    height: 67,
    width: 355,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#9C9A9A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
    marginBottom: 100,
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
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#58CECE'
  },
});

export default SignIn;
