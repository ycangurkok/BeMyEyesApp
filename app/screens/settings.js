import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Settings() {
  const navigation = useNavigation();
  const [isSignedIn, setIsSignedIn] = useState();

  const options = [
    { key: 'logout', title: 'Log out' },
    { key: 'customization', title: 'Customization' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleOptionPress(item.key)}
    >
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    // Implement logout functionality here
    // For example, navigate to the login screen
    await AsyncStorage.removeItem("userToken");
    setIsSignedIn(false);
    navigation.navigate('First');
  };

  const handleOptionPress = (key) => {
    if (key === 'logout') {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to sign out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => handleLogout(),
          },
        ],
        { cancelable: false }
      );
    } else if (key === 'customization') {
      // Navigate to the customization screen or implement the desired functionality
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#000000',
    padding: 20,
  },
  option: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#9C9A9A',
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Settings;
