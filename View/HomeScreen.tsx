import React, { useEffect, useState } from 'react';
import { Text, View, Button,Image,ActivityIndicator, TouchableOpacity, Alert , StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        
        if (token) {
          const response = await fetch('http://10.0.2.2:8000/api/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
          
          const result = await response.json();
          setData(result); // Assuming the API returns an array of items
          setLoading(false);
        } else {
          // No token found, navigate to LoginScreen
          navigation.replace('Login'); // replace prevents going back to Home
        }
        
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkToken();
  }, [navigation]);

  const handlePressDetail = () => {
    Alert.alert('Button Pressed', 'You pressed the Detail button!');
    navigation.navigate('BookList');
  };

  const handlePressUpdate = () => {
    Alert.alert('Button Pressed', 'You pressed the Update Button!');
    navigation.navigate('BookUpdate');
  };

  const handlePressDelete = () => {
    Alert.alert('Button Presses', 'You pressed the Delete Button!');
    navigation.navigate('BookDelete');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // Clear the token on logout
    navigation.navigate('Login'); // Navigate back to login screen
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Welcome to the Home Screen!</Text>

      {data && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18 }}>Name: {data.name}</Text>
          <Text style={{ fontSize: 18 }}>Email: {data.email}</Text>
        </View>
      )}

      <Button title="Logout" onPress={handleLogout} />

      <View style={styles.row}>
        <View style={styles.box}>
        <TouchableOpacity style={styles.squareButton} onPress={handlePressDetail}>
       <Image 
          source={{ uri: 'https://i.pinimg.com/originals/06/e8/eb/06e8eb60a460f5e02f35f6c99a029eec.png' }} // Replace this with your image URL or local asset
          style={styles.buttonImage}
        />
         <Text style={styles.buttonText}>Book Detail</Text>
       </TouchableOpacity>
        </View>
        <View style={styles.box}>
        <TouchableOpacity style={styles.squareButton} onPress={handlePressUpdate}>
       <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/806/806160.png' }} // Replace this with your image URL or local asset
          style={styles.buttonImage}
        />
         <Text style={styles.buttonText}>Book Update</Text>
       </TouchableOpacity>
        </View>
        <View style={styles.box}>
        <TouchableOpacity style={styles.squareButton} onPress={handlePressDelete}>
       <Image 
          source={{ uri: 'https://cdn3.iconfinder.com/data/icons/documents-2-2/32/Documents_Delete_Book-512.png' }} // Replace this with your image URL or local asset
          style={styles.buttonImage}
        />
         <Text style={styles.buttonText}>Book Delete</Text>
       </TouchableOpacity>
        </View>
       </View>
    </View>
      
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', // Layout items horizontally in a row
    justifyContent: 'space-between', // Space between the boxes
    marginBottom: 20, // Spacing between rows
    marginTop:70
  },
  box: {
    width: 100,  // Width of each box
    height: 100, // Height of each box
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 150
  },
  squareButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }], // Center horizontally
    width: 100,  // Square button width
    height: 100, // Square button height
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Optional: to make the corners rounded
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',  // Makes sure the image covers the button area
  },
});

