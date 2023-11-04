import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './src/components/Button';

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null); // Use useRef to create a ref
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Track whether the camera is open

  let options = {
    quality: 1,
    base64: true,
    exif: false
  };

  /*useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);*/

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();

      if (cameraStatus.status === 'granted' && mediaLibraryStatus.status === 'granted') {
        setCameraPermission(true);
      } else {
        setCameraPermission(false);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) { // Access the ref using .current
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => { //backende yollama kodu gelicek
    if(image) {
      try{
        let b64 = image.base64;
        console.log(b64)
      } catch(e) {
        console.log(e);
      }
    }
  }

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };


  if (cameraPermission === false) {
    return <Text>No access to the camera</Text>;
  }

  if (isCameraOpen) {
    // Render the camera view
    return (
      <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 30,
          }}>
            <Button icon={'retweet'} onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back)
            }}/>
            <Button icon={'flash'} 
              color={flash === 'off' ? 'gray' : '#f1f1f1'}
              onPress={() => {
                setFlash(flash === 'off' 
                  ? 'on'
                  : 'off'
                  )
              }}/>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? 
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 50
        }}>
          <Button title={"Re-take"} icon={"retweet"} onPress={() => setImage(null)}/>
          <Button title={"Save"} icon={"check"} onPress={saveImage}/>
        </View>
        :
        <Button title={'Take a picture'} icon="camera" onPress={takePicture} />
        
        }
        <TouchableOpacity onPress={closeCamera}>
          <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', backgroundColor: 'blue', padding: 10 }}>
            Back to Home Screen
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} else {
    // Render the home page with the camera button
    return (
      <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={openCamera}>
          <View style={{ borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 5 }}>
            <Text style={{ fontSize: 24, color: 'black' }}>Camera</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
});

