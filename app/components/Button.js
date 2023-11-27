import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Button({ title, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        {icon && <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />}
        {title && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff', // Butonun arka plan rengi
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0056b3',
    flexDirection: 'row', // İkon ve metni yatay olarak hizalamak için
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    color: '#ffffff', // Metin rengi
    fontSize: 16,
    marginLeft: 8, // İkon varsa metin aralığı için
  },
});

