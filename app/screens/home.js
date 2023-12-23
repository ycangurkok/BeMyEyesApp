import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from "expo-speech";
import BeMyEyesLogo from '../images/BeMyEyesNew2.jpeg';
import CameraLogo from '../images/camera.png';
import MoneyLogo from '../images/money.png';
import NavigationLogo from '../images/navigation.png';
import VideoLogo from '../images/video.png';
import TextLogo from '../images/text.png';
import HatLogo from '../images/hat.png';
import HomeLogo from '../images/home.png';
import ReplayLogo from '../images/replay.png';
import SettingsLogo from '../images/settings.png';

const HomePage = ({ onNavigate }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#000', // Set the header background color
      },
      headerTintColor: '#fff', // Optional: Set the header text and icons color
    });
  }, [navigation]);

 
  const openCamera = (headerTitle, endpointName) => {
    navigation.navigate('Camera', { headerTitle, endpointName });
  };

  const openWhereAmI = () => {
    navigation.navigate('WhereAmI');
  };


  const openHome = () => {
    navigation.navigate('Home');
  };

  const replaySound = async () => {
    const lastSpoken = await AsyncStorage.getItem("lastSpoken");
    Speech.speak(lastSpoken);
  };

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>

    
    
      <Image source={BeMyEyesLogo} style={styles.image} />
      

      <View style={styles.row}>

        <TouchableOpacity onPress={() => openCamera('Describe Scene','describeImage')} style={styles.button}>
        <Image source={CameraLogo} style={styles.imageLogo} />
          <Text style={styles.buttonText}>Describe Scene</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openCamera('Count Money', 'moneyPredict')} style={styles.button}>
        <Image source={MoneyLogo} style={styles.moneyImageLogo} />
          <Text style={styles.buttonText}>Count Money</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => openWhereAmI('Where Am I?')} style={styles.button}>
        <Image source={NavigationLogo} style={styles.navigationImageLogo} />
          <Text style={styles.buttonText}>Where Am I?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openCamera('Video Capture')} style={styles.button}>
        <Image source={VideoLogo} style={styles.videoImageLogo} />
          <Text style={styles.buttonText}>Video Capture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => openCamera('Read Text', 'wordsImage')} style={styles.button}>
        <Image source={TextLogo} style={styles.navigationImageLogo} />
          <Text style={styles.buttonText}>Read Text</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openCamera('Smart Hat')} style={styles.button}>
        <Image source={HatLogo} style={styles.hatImageLogo} />
          <Text style={styles.hatButtonText}>Smart Hat</Text>
        </TouchableOpacity>
        
      </View>
      


      <View style={styles.footer}>
      
        <TouchableOpacity 
        
          style={styles.footerButton} 
          onPress={openHome}
        >
          <Image source={HomeLogo} style={styles.homeImageLogo} />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={replaySound}
        >
          <Image source={ReplayLogo} style={styles.homeImageLogo} />
          <Text style={styles.footerButtonText}>Replay Sound</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={openSettings}
        >
          <Image source={SettingsLogo} style={styles.settingsImageLogo} />
          <Text style={styles.footerButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: "#000000",
    alignItems: 'center',
    padding: 20,
    marginTop: -40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Tüm genişliği kaplaması için
    marginBottom: 100,
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    width: 180,
    height: 72,
    borderRadius: 15,
    marginLeft: 15,
    
  },
  footerButton: {
    flex: 1, // Eşit genişlikte butonlar
    padding: 10,
    backgroundColor: '#000', // Buton arka plan rengi
    borderRadius: 5,
    marginHorizontal: 5, // Butonlar arasında boşluk
    borderWidth: 1, // Kenarlık genişliği
    borderColor: 'black', // Kenarlık rengi (beyaz)
  },
  footerButtonText: {
    color: 'white', // Metin rengi
    fontSize: 16, // Metin boyutu
    textAlign: 'center', // Metni ortala
  },
  footer: {
    position: 'absolute', // Footer'ı sayfanın altına sabitle
    bottom: 0, // En alta yerleştir
    flexDirection: 'row', // Butonları yan yana sırala
    width: '100%',
    height: 80, // Footer yüksekliği
    backgroundColor: '#000', // Footer arka plan rengi
    justifyContent: 'center', // İçeriği dikey olarak ortala
    alignItems: 'center', // İçeriği yatay olarak ortala
  },
  footerText: {
    color: 'white', // Metin rengi
    fontSize: 16, // Metin boyutu
  },
  headerText: {
    justifyContent: 'flex-start',
    width: 392,
    height: 208,
    padding: 100,
    fontSize: 44,
    color: 'white',
  },
  image: {
    width: 274,
    height: 207,
    marginBottom: 20, // add some margin if needed
    marginTop: 10,

  },
  imageLogo: {
    width: 87,
    height: 72,
    marginBottom: 20, // add some margin if needed
    marginLeft: 30,
  },
  moneyImageLogo: {
    width: 95,
    height: 92,
    marginLeft: 27,
  },
  navigationImageLogo: {
    width: 95,
    height: 92,
    marginLeft: 10,
    marginBottom: 4,
  },
  videoImageLogo: {
    width: 95,
    height: 92,
    marginLeft: 20,
    marginBottom: 4,
  },
  hatImageLogo: {
    width: 125,
    height: 92,
    marginLeft: -10,
    marginBottom: 4,
  },
  homeImageLogo: {
    width: 46,
    height: 42,
    marginLeft: 24,
    marginBottom: -4,
  },
  settingsImageLogo: {
    width: 45,
    height: 42,
    marginLeft: 24,
    marginBottom: 4,
  },
  lineStyle: {
    height: 1, // Çizginin kalınlığı
    backgroundColor: 'white', // Çizginin rengi
    width: '100%', // Genişlik, tüm ekranı kaplasın
    marginBottom: 100, // Altındaki içeriğe boşluk bırak
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  hatButtonText: {
    fontSize: 24,
    color: 'white',
    marginLeft: 10,
  },
});


export default HomePage;
