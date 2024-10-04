import React, { useState, useEffect } from 'react';
import { Text,Image , View, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookShowDelete({navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const checkToken = async () => {
          const token = await AsyncStorage.getItem('token');
          
          if (token) {
            try {
              const response = await fetch('http://10.0.2.2:8000/api/user/databuku', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
              });
              
              const result = await response.json();
              setData(result); // Assuming the API returns an array of items
              setLoading(false);
            } catch (error) {
              console.error(error);
              setLoading(false);
            }
          } else {
            // No token found, navigate to LoginScreen
            navigation.replace('Login'); // replace prevents going back to Home
          }
        };
    checkToken();
}, [navigation]); // Run once when component mounts

    const handleDelete = async (id) => {
       const token = await AsyncStorage.getItem('token');
       if (token) {
        try {
                const response = await fetch(`http://10.0.2.2:8000/api/user/deletebuku/${id}`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
                });

                const result = await response.json();
                if (response.ok) {
                  Alert.alert('Success', 'Book Delete successfully!');
                  navigation.goBack(); // Go back to the previous screen
                } else {
                  Alert.alert('Error', result.message || 'Something went wrong!');
                }
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to delete book.');
        }
       }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>Book ID: {item.id}</Text>
          <Text>Content: {item.content}</Text>
          <Text>Visuals: {item.visuals}</Text>
          <Text>Book Cover: {item.book_cover}</Text>
            <TouchableOpacity style={styles.squareButton} onPress={() => handleDelete(item.id)}>
           <Image 
              source={{ uri: 'https://i.pinimg.com/originals/06/e8/eb/06e8eb60a460f5e02f35f6c99a029eec.png' }} // Replace this with your image URL or local asset
              style={styles.buttonImage}
            />
             <Text>Book Delete</Text>
             </TouchableOpacity>
        </View>
      );

      if (loading) {
        return (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
    
      return (
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()} // Unique key for each item
            renderItem={renderItem}
          />
        </View>
      );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
          backgroundColor: 'white',
        },
        item: {
          backgroundColor: '#f9c2ff',
          padding: 15,
          marginVertical: 8,
          borderRadius: 8,
        },
        title: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        loader: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        squareButton: {
          marginTop: 10,
          marginBottom: 2,
          left: '15%',
          transform: [{ translateX: -50 }], // Center horizontally
          width: 100,  // Square button width
          height: 50, // Square button height
          backgroundColor: '#ec6400',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10, // Optional: to make the corners rounded
        },
      });