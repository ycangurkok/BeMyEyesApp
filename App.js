import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './src/components/Button';

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null); // Use useRef to create a ref

  let options = {
    quality: 1,
    base64: true,
    exif: false
  };

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === 'granted');
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
        let b64 = photo.base64;
        console.log(b64)
      } catch(e) {
        console.log(e);
      }
    }
  }

  if (cameraPermission === false) {
    return <Text>No access to the camera</Text>;
  }

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
            padding: 60,
          }}>
            <Button icon={'retweet'} onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back)
            }}/>
            <Button icon={'flash'} 
              color={flash === 'off' ? 'gray' : '#f1f1f1'}
              onPress={() => {
                setFlash(flash === 'off' ? 'on' : 'off')
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
      </View>
    </View>
  );
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

