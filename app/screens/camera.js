import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/Button'; // Make sure the path is correct

const CameraComponent = () => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(); // Use useRef to create a ref
    const [isCameraOpen, setIsCameraOpen] = useState(false); // Track whether the camera is open
    const [image, setImage] = useState(null);

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

    let takePicture = async () => {
        let options = {
        quality: 1,
        base64: true,
        exif: false
        };
        let image = await cameraRef.current.takePictureAsync(options);
        setImage(image);
    }

    const saveImage = async () => {
        if(image) {
        try{
            const url = "http://192.168.1.106:8080";
            const data = {
            image_data: image.base64
            };
            let jsonData = JSON.stringify(data);
            const response = await fetch(url, {
            method: 'POST',
            body: jsonData,
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
            });
            console.log(response);
        } catch(e) {
            console.log(e);
        }
        }
    }

    const closeCamera = () => {
        setIsCameraOpen(false);
    };

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
                <Image source={{ uri: "data:image/jpg;base64," + image.base64 }} style={styles.camera} />
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
    // ... other styles if needed
});

export default CameraComponent;