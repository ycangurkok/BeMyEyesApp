import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/Button';
import CameraComponent from './camera.js'


const EntryPage = ({ onNavigate }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const openCamera = () => {
    setIsCameraOpen(true);
    onNavigate();// This will change the state in App.js
  };

if (isCameraOpen) {
    // Render the camera view
    return <CameraComponent onClose={() => setIsCameraOpen(false)} />;
} else {
    // Render the home page with the camera button
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={openCamera} style={styles.button}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }
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


export default EntryPage;
