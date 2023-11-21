import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const HomePage = ({ onNavigate }) => {
  const navigation = useNavigation();

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={openCamera} style={styles.button}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
});


export default HomePage;
