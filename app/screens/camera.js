import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/Button'; // Make sure the path is correct
import { useNavigation, useRoute } from '@react-navigation/native';
import FormData from "form-data";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from "expo-speech";
import HomeLogo from '../images/home.png';
import ReplayLogo from '../images/replay.png';
import SettingsLogo from '../images/settings.png';
import FlashLogo from '../images/flash.png';
import TurnCameraLogo from '../images/turnCamera.png';

const CameraComponent = ({ onNavigate }) => {
    const navigation = useNavigation();
    const route = useRoute();

    const [cameraPermission, setCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(); // Use useRef to create a ref
    const [isCameraOpen, setIsCameraOpen] = useState(false); // Track whether the camera is open
    const [image, setImage] = useState(null);
    let lastSpoken = "";

    const [headerTitle, setHeaderTitle] = useState('Default Camera');



    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: headerTitle,
        headerStyle: {
            backgroundColor: '#000', // Set the header background color
          },
          headerTintColor: '#fff', // Optional: Set the header text and icons color
      });
    }, [navigation, headerTitle]);




    /*useLayoutEffect(() => {
        const headerTitle = route.params?.headerTitle || 'Default Camera'; // Parametre olarak verilen başlık, yoksa varsayılan bir başlık
        navigation.setOptions({
            headerTitle: headerTitle, // Header başlığı
            headerStyle: {
                backgroundColor: 'white', // Header arka plan rengi
            },
            headerTintColor: '#fff', // Header metin ve ikon rengi
            // Burada daha fazla header ayarı yapabilirsiniz
        });
    }, [navigation, route.params?.headerTitle]);*/

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
        const newHeaderTitle = route.params?.endpointName || 'Default Camera';
        let title='';
        if (newHeaderTitle=='describeImage') {
            title = 'DESCRIBE SCENE'
        }
        else if (newHeaderTitle=='moneyPredict') {
            title = 'COUNT MONEY'
        }
        else if (newHeaderTitle=='wordsImage') {
            title = 'READ TEXT'
        }
        console.log("New Header Title:", title); // Debug log
        setHeaderTitle(title);
        }, [route.params?.endpointName]);

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

    let takePicture = async () => {
        let options = {
        quality: 0.3,
        base64: true,
        exif: false
        };
        let image = await cameraRef.current.takePictureAsync(options);
        setImage(image);
    }
    const toggleFlash = () => {
        
        setFlashMode(prevMode => 
            prevMode === Camera.Constants.FlashMode.off 
            ? Camera.Constants.FlashMode.on 
            : Camera.Constants.FlashMode.off
        );
      
    };


    const saveImage = async () => {
        if (image) {
            try {
                const formData = new FormData();
                formData.append('ImageFile', {
                    uri: image.uri,
                    type: 'image/jpg',
                    name: 'photo.jpg',
                });
    
                endpointName = route.params?.endpointName
                console.log(endpointName)
                
                if (endpointName=='describeImage') {
                    const response = await fetch('https://bemyeyesdeploy.azurewebsites.net/api/ImageAnalysis/'+ endpointName, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        body: formData,
                        
                    });
        
                    if (response.ok) {
                        console.log('Image uploaded successfully');
                        const responseData = await response.json();
                        lastSpoken = String(responseData);
                        await AsyncStorage.setItem('lastSpoken', lastSpoken);
                        Speech.speak(lastSpoken);
                        // Handle success, e.g., show a success message
                    } else {
                        console.error('Failed to upload image');
                        console.log(response);
                        // Handle failure, e.g., show an error message
                    }
                } else if (endpointName=='wordsImage') {
                    // read text özelliği trigger edilirse
                } else {
                    
                }
            } catch (error) {
                console.error('Error uploading image', error);
                // Handle error, e.g., show an error
            }
        
        } else {
            console.warn('No image to save');
            // Handle the case where there is no image to save
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
                    flashMode={flashMode}
                    ref={cameraRef}
                    >
                </Camera>
            ) : (
                <Image source={{ uri: "data:image/jpg;base64," + image.base64 }} style={styles.camera} />
            )}
            <View>
                {image ? 
                <View style={styles.takePicButton}>
                    <Button title={"Re-take"} icon={"retweet"} onPress={() => setImage(null)}/>
                    <Button title={"Save"} icon={"check"} onPress={saveImage}/>
                </View>
                :
                <View style={styles.takePicButton}>
                   
             
                        <Button icon={'retweet'} onPress={() => {
                            setType(type === CameraType.back ? CameraType.front : CameraType.back)
                        }}/>
                        <Button title={'Take a picture'} icon="camera" onPress={takePicture}/>

                        <Button title={flashMode === Camera.Constants.FlashMode.on ? "Flash Aç" : "Flash Kapat"} onPress={toggleFlash} />
                   
                </View>
                
                }
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
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
        borderRadius: 10,
        height: 300, // Sabit bir yükseklik değeri
    },
    header: {
        height: 50, // Header'ın yüksekliği
        alignItems: 'center', // İçeriği yatay olarak ortala
        justifyContent: 'center', // İçeriği dikey olarak ortala

      },
      headerText: {
        textAlign: 'center',
        color: 'white', // Metin rengi
        fontSize: 20, // Metin boyutu
        fontWeight: 'bold', // Metin kalınlığı
        padding: 10,
      },
      button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'black',
      },
      takePicButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 60,
        backgroundColor: 'black',
  
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
  
});

export default CameraComponent;