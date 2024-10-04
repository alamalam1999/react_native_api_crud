import React, { useState, useEffect } from 'react';
import { Text,Image , View, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';


const BookUpdate = ({route, navigation}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [visuals, setVisuals] = useState('');
  const [bookCover, setBookCover] = useState('');
  const [layout, setLayout] = useState('');
  const [genres, setGenres] = useState('');
  const [physicalAttributes, setPhysicalAttributes] = useState('');
  const [interactiveElements, setInteractiveElements] = useState('');

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
                setData(result);
                setContent(result.content);
                setVisuals(result.visuals);
                setBookCover(result.book_cover);
                setLayout(result.layout_formating);
                setGenres(result.genres);
                setPhysicalAttributes(result.physical_attributes);
                setInteractiveElements(result.interactive_elements);

                setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      Alert.alert("You dont have LOGIN");
      navigation.replace('Login'); // replace prevents going back to Home
    }
  }

  checkToken();
}, [id]);

const handleSubmit = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch(`http://10.0.2.2:8000/api/user/updatebuku/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          visuals,
          book_cover: bookCover,
          layout_formating: layout,
          genres,
          physical_attributes: physicalAttributes,
          interactive_elements: interactiveElements,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Book updated successfully!');
        navigation.goBack(); // Go back to the previous screen
      } else {
        Alert.alert('Error', result.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update book.');
    }
  }
};

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
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>Book ID: {data.id}</Text>

          <Text style={styles.title}>Content:</Text>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
          />

          <Text style={styles.title}>Visuals:</Text>
          <TextInput
            style={styles.input}
            value={visuals}
            onChangeText={setVisuals}
          />

          <Text style={styles.title}>Book Cover:</Text>
          <TextInput
            style={styles.input}
            value={bookCover}
            onChangeText={setBookCover}
          />

          <Text style={styles.title}>Layout:</Text>
          <TextInput
            style={styles.input}
            value={layout}
            onChangeText={setLayout}
          />

          <Text style={styles.title}>Genres:</Text>
          <TextInput
            style={styles.input}
            value={genres}
            onChangeText={setGenres}
          />

          <Text style={styles.title}>Physical Attributes:</Text>
          <TextInput
            style={styles.input}
            value={physicalAttributes}
            onChangeText={setPhysicalAttributes}
          />

          <Text style={styles.title}>Interactive Elements:</Text>
          <TextInput
            style={styles.input}
            value={interactiveElements}
            onChangeText={setInteractiveElements}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
);
}

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
  input: {
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100px',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  }
});

export default BookUpdate