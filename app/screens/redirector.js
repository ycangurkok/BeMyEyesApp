import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet } from 'react-native';

function Redirector() {
  const navigation = useNavigation();
  
  useEffect(() => {
    checkSignInStatus();
  }, []);

  const checkSignInStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if(!token){
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    } catch (error) {
      console.error('Error checking sign-in status:', error);
    }
  };


  return (<View style={styles.container}></View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    marginBottom: 0
  }
});

export default Redirector;
