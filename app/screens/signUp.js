import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const handleSignUp = async () => {
    let e_error = false;
    let p_error = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Here you would usually send the email and password to your server
    if(!emailRegex.test(email)) {
      e_error = true;
      setEmailError("Invalid email address!");
    }
    if (password.length < 6) {
      p_error = true;username
      setPasswordError('Password must be at least 6 characters and include at least one number');
      return;
    }
    if (p_error || e_error) {
      return;
    }
    console.log('Sign Up with', email, password);
    const url = "https://bemyeyesdeploy.azurewebsites.net/api/auth/registration";
            const data = {
                username: name,
                fullname: name,
                email: email,
                password: password
            };
            let jsonData = JSON.stringify(data);
            const response = await fetch(url, {
                method: 'POST',
                body: jsonData, //Burası formdata olucak image ep leri için.
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                },
            });
    if(response.ok){
      console.log(response);
      await AsyncStorage.setItem('userToken', "test");
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
    else{
      return;
    }
    
  };

  return (
    <View style={styles.container}>

    <Text style={styles.headerText}>BeMyEyes</Text>

      <View style={styles.container}>
        <TextInput
          style={styles.googleButton}
          onChangeText={handleNameChange}
          placeholder="Enter your user name"
          value={name}
          autoCapitalize="none"
          placeholderTextColor="white"
        />

        <TextInput
          style={styles.googleButton}
          onChangeText={handleEmailChange}
          value={email}
          keyboardType="email-address"
          placeholder="Enter your email"
          autoCapitalize="none"
          placeholderTextColor="white"
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <TextInput
          style={styles.googleButton}
          onChangeText={handlePasswordChange}
          value={password}
          placeholder="Enter your password"
          placeholderTextColor="white"
          autoCapitalize="none"
          secureTextEntry
        />
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}


      <Button title="Sign Up" style={styles.signUpLink} onPress={handleSignUp} />

    </View>

    <Button title="Alreadt have an account? Sign In" style={styles.link} onPress={openSignIn} />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
    justifyContent: 'flex-start',
    marginBottom: 25,
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
  signUpLink: {
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#58CECE'
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
  headerText: {
    justifyContent: 'flex-start',
    width: 392,
    height: 208,
    padding: 100,
    fontSize: 44,
    color: 'white',
  
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  link: {
    justifyContent: 'flex-end',
    backgroundColor: '#58CECE'
  },
});

export default SignUp;
