import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './View/LoginScreen';
import HomeScreen from './View/HomeScreen'; // This is the screen after login
import BookShowList from './View/BookShowList';
import BookShowDetail from './Detail/BookShowDetail';
import BookShowUpdate from './View/BookShowUpdate';
import BookShowDelete from './View/BookShowDelete';
import BookUpdate from './Detail/BookUpdate';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BookList" component={BookShowList} />
        <Stack.Screen name="BookDetail" component={BookShowDetail} />
        <Stack.Screen name="BookUpdate" component={BookShowUpdate} />
        <Stack.Screen name="BookDelete" component={BookShowDelete} />
        <Stack.Screen name="BookUpdateById" component={BookUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
