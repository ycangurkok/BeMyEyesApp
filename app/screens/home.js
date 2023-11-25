import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


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

 
  const openCamera = (headerTitle) => {
    navigation.navigate('Camera', { headerTitle });
  };


  const openHome = () => {
    navigation.navigate('Home');
  };

  const replaySound = () => {
    navigation.navigate('Home');
  };

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>BeMyEyes</Text>

      <View style={styles.row}>

        <TouchableOpacity onPress={() => openCamera('Describe Scene')} style={styles.button}>
          <Text style={styles.buttonText}>Describe Scene</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openCamera('Count Money')} style={styles.button}>
          <Text style={styles.buttonText}>Count Money</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => openCamera('Where Am I?')} style={styles.button}>
          <Text style={styles.buttonText}>Where Am I?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openCamera('Video Capture')} style={styles.button}>
          <Text style={styles.buttonText}>Video Capture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => openCamera('Read Text')} style={styles.button}>
          <Text style={styles.buttonText}>Read Text</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openCamera('Smart Hat')} style={styles.button}>
          <Text style={styles.buttonText}>Smart Hat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
   
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={openHome}
        >
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={replaySound}
        >
          <Text style={styles.footerButtonText}>Replay Sound</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={openSettings}
        >
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
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    width: 180,
    height: 72,
    borderRadius: 15,
    
  },
  footerButton: {
    flex: 1, // Eşit genişlikte butonlar
    padding: 10,
    backgroundColor: '#000', // Buton arka plan rengi
    borderRadius: 5,
    marginHorizontal: 5, // Butonlar arasında boşluk
    borderWidth: 1, // Kenarlık genişliği
    borderColor: 'white', // Kenarlık rengi (beyaz)
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
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});


export default HomePage;
