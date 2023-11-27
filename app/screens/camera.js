import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/Button'; // Make sure the path is correct
import { useNavigation, useRoute } from '@react-navigation/native';
import FormData from "form-data";

const CameraComponent = ({ onNavigate }) => {
    const navigation = useNavigation();
    const route = useRoute();

    const [cameraPermission, setCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(); // Use useRef to create a ref
    const [isCameraOpen, setIsCameraOpen] = useState(false); // Track whether the camera is open
    const [image, setImage] = useState(null);

    useLayoutEffect(() => {
        const headerTitle = route.params?.headerTitle || 'Default Camera'; // Parametre olarak verilen başlık, yoksa varsayılan bir başlık
        navigation.setOptions({
            headerTitle: headerTitle, // Header başlığı
            headerStyle: {
                backgroundColor: 'white', // Header arka plan rengi
            },
            headerTintColor: '#fff', // Header metin ve ikon rengi
            // Burada daha fazla header ayarı yapabilirsiniz
        });
    }, [navigation, route.params?.headerTitle]);

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

    const openHome = () => {
        navigation.navigate('Home');
      };
    
      const replaySound = () => {
        navigation.navigate('Home');
      };
    
      const openSettings = () => {
        navigation.navigate('Settings');
      };

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
        // Write code here
        if (image) {
            try {
                const formData = new FormData();
                formData.append('ImageFile', {
                    uri: image.uri,
                    type: 'image/jpg',
                    name: 'photo.jpg',
                });
    
                const response = await fetch('https://bemyeyesdeploy.azurewebsites.net/api/ImageAnalysis/describeImage', {
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
                    console.log(responseData);
                    // Handle success, e.g., show a success message
                } else {
                    console.error('Failed to upload image');
                    console.log(response);
                    // Handle failure, e.g., show an error message
                }
            } catch (error) {
                console.error('Error uploading image', error);
                // Handle error, e.g., show an error message
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
            <View style={styles.header}>
                <Text style={styles.headerText}>{route.headerTitle}</Text>
                {/* Header içinde diğer bileşenler veya butonlar eklenebilir */}
            </View>

            {!image ? (
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                    >
                    <View style={styles.button}>
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
                <View style={styles.button}>
                <Button title={"Re-take"} icon={"retweet"} onPress={() => setImage(null)}/>
                <Button title={"Save"} icon={"check"} onPress={saveImage}/>
                </View>
                :
                <Button title={'Take a picture'} icon="camera" onPress={takePicture} />
                
                }
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
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    camera: {
        flex: 1,
        borderRadius: 20,
        height: 300, // Sabit bir yükseklik değeri
    },
    header: {
        height: 20, // Header'ın yüksekliği
        alignItems: 'flex-end', // İçeriği yatay olarak ortala
        justifyContent: 'flex-end', // İçeriği dikey olarak ortala
      },
      headerText: {
        justifyContent: 'flex-end',
        color: '#000', // Metin rengi
        fontSize: 20, // Metin boyutu
        fontWeight: 'bold', // Metin kalınlığı
      },
      button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'black',
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
  
});

export default CameraComponent;