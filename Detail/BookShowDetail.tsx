import React, { useState, useEffect } from 'react';
import { Text,Image , View, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BookShowDetail = ({ route,navigation }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const { id } = route.params;

    useEffect(() => {
    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        
        if (token) {
          try {
            const response = await fetch('http://10.0.2.2:8000/api/user/databuku/'+id, {
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
          Alert.alert("You dont have LOGIN");
           navigation.replace('Login'); // replace prevents going back to Home
        }
      };

      checkToken();
    }, [id]);

    // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
    return (
       <View style={styles.container}>
        {data && (
            <View style={{ marginBottom:20 }} >
                <Text style={styles.title}>Book ID: {data.id}</Text>
                <Text>Content: {data.content}</Text>
                <Text>Visuals: {data.visuals}</Text>
                <Text>Book Cover: {data.book_cover}</Text>
                <Text>Layout: {data.layout_formating}</Text>
                <Text>Genres: {data.genres}</Text>
                <Text>Physical Attributes: {data.physical_attributes}</Text>
                <Text>Interactive Elements: {data.interactive_elements}</Text>
            </View>
        )}
       </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    text: {
      fontSize: 20,
      color: '#333',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
  });

  export default BookShowDetail;

