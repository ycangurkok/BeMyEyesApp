import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Button, Text } from 'react-native';
import base64 from 'react-native-base64';

  function StreamScreen() {
  const [streamData, setStreamData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.1.125:5001/ws/client');

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    ws.onmessage = (e) => {
        // Convert the byte array to a base64 string
        let bytes = new Uint8Array(e.data);
        let binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        let imageBase64 = base64.encode(binary);
        let imageSrc = `data:image/jpeg;base64,${imageBase64}`;
        setStreamData(imageSrc);
      };

    ws.onerror = (e) => {
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
    };

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        // Close the WebSocket when the app goes to the background
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close();
          console.log('WebSocket Closed due to App State Change');
        }
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
        console.log('WebSocket Closed');
      }
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  // Example button actions
  const handleButtonPress1 = () => {
    console.log('Button 1 pressed');
  };

  const handleButtonPress2 = () => {
    console.log('Button 2 pressed');
  };

  return (
    <View style={styles.container}>

      <View style={styles.streamContainer}>
        {!isConnected && <Text>Connecting...</Text>}
        {streamData && (
          <Image source={{ uri: streamData }} style={styles.streamImage} />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Button 1" onPress={handleButtonPress1} />
        <Button title="Button 2" onPress={handleButtonPress2} />
        {/* Add more buttons as needed */}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  streamContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  streamImage: {
    width: '90%', // Adjust as needed
    height: '90%', // Adjust as needed
    resizeMode: 'contain'
  }
});

export default StreamScreen;
