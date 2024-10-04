import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const apiUrl = 'http://10.0.2.2:8000/api/login'; // Adjust this as needed

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(response => response.json())
    .then(async (data) => {
      if (data) {
        // Save token to AsyncStorage
        await AsyncStorage.setItem('token', data.token);
        
        Alert.alert('Login Successful', 'Welcome!');
        
        // Navigate to the Home screen
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    })
    .catch(error => {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login}>LOGIN</Text>
      
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={true} // for password input
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  login: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
