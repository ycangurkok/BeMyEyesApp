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

  const handleSignIn = async () => {
    let e_error = false;
    let p_error = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      e_error = true;
      setEmailError("Invalid email address!");
    }
    if (password.length < 6) {
      p_error = true;
      setPasswordError('Password must be at least 6 characters and include at least one number');
    }
    if (p_error || e_error) {
      return;
    }
    // Here you would usually send the email and password to your server
    console.log('Sign in with', email, password);
    const url = "https://bemyeyesdeploy.azurewebsites.net/api/auth/login";
    const data = {
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
          onChangeText={handleEmailChange}
          value={email}
          placeholder="Enter your e-mail"
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


      
      <Button title="Sign In" style={styles.signInLink} onPress={handleSignIn} />
    </View>

    <Button title="Don't have an account? Sign Up" style={styles.link} onPress={openSignUp} />
        
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

export default SignIn;
