import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundLogo from '../images/background.png';
import TransparentText from '../images/transparentText.png';
import * as Haptics from 'expo-haptics';


function WelcomePage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const openSignUp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('SignUp');
  };

  const openSignIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {
    // Here you would usually send the email and password to your server
    console.log('Sign Up with', email, password);
  };

  return (

    
    <View style={styles.container}>


      <ImageBackground source={BackgroundLogo} style={styles.imageBackground} resizeMode="cover">
      <Text style={styles.transparentText}>BeMyEyes</Text>
      </ImageBackground>

      <View style={styles.container}>
            <TouchableOpacity onPress={openSignIn} style={[styles.googleButton, styles.buttonSpacing]}>
            <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openSignUp} style={styles.mailButton}>
            <Text style={styles.mailButtonText}>Sign Up</Text>
            </TouchableOpacity>

      </View>
       

      

    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  googleButton: {
    height: height * 0.08, // Ekran yüksekliğinin %8'i
    width: width * 0.9, // Ekran genişliğinin %90'ı
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: width * 0.1, // Ekran genişliğinin %10'u
    backgroundColor: '#58CECE',
    marginBottom: 0,
    alignSelf: 'center',
  },
  mailButton: {
    height: height * 0.08, // Ekran yüksekliğinin %8'i
    width: width * 0.9, // Ekran genişliğinin %90'ı
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: width * 0.1, // Ekran genişliğinin %10'u
    backgroundColor: '#171717',
    marginBottom: 0,
    alignSelf: 'center',
  },
  mailButtonText: {
    fontSize: width * 0.05, // Ekran genişliğinin %5'i
    color: '#FFF',
    fontStyle: 'normal',
    padding: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: width * 0.05, // Ekran genişliğinin %5'i
    color: '#000',
    fontStyle: 'normal',
    padding: 10,
    alignSelf: 'center',

  },
  buttonSpacing: {
    marginBottom: 25,
  },
  text: {
    width: width * 0.95, // Ekran genişliğinin %95'i
    padding: 30, // Sabit değer olabilir veya ekran boyutlarına göre ayarlanabilir
    fontSize: width * 0.11, // Ekran genişliğinin %11'i
    color: 'white',
    textAlign: 'center', // Metni yatay olarak ortalar
    marginTop: height * 0.1,
  },
  imageBackground: {
    width: width * 1, // Ekran genişliğinin %80'i
    height: height * 0.3, // Ekran yüksekliğinin %25'i
    marginTop: height * 0.09,
    opacity: 0.5,
  },
  image: {
    width: width * 1, // Ekran genişliğinin %80'i
    height: height * 0.3, // Ekran yüksekliğinin %25'i
    opacity: 0.2,
    marginTop: height * 0.01

  },
  transparentText: {
    color: 'rgba(0, 0, 0, 0.8)', 
    fontSize: width * 0.16, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: height * 0.1, 
  },

});

export default WelcomePage;
