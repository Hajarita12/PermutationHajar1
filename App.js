import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './components/connexion';
import Apropos from './components/Apropos';
import Acceuil from './components/Acceuil';
import Inscription from './components/Inscription';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          tabBarPosition="top"
          tabBarOptions={{
            activeTintColor: '#007AFF',
            inactiveTintColor: '#8E8E93',
            labelStyle: { fontSize: 12, fontWeight: 'bold' },
            style: { backgroundColor: '#FFFFFF' },
            indicatorStyle: { backgroundColor: '#007AFF' },
          }}
        >
          <Tab.Screen
            name="Accueil"
            component={Acceuil}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Connexion"
            component={LoginScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="À Propos"
            component={Apropos}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="information-circle" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Inscription"
            component={Inscription}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="create" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
