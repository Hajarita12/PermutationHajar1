import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import SearchPage from './SearchPage';
import Comb from './Comb';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInProfEmail, setLoggedInProfEmail] = useState('');

  const handleLogin = async () => {
    if (!email || !motDePasse) {
      console.error('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: motDePasse,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Connexion réussie:', data);

        setIsLoggedIn(true);
        setLoggedInProfEmail(email);
        setEmail('');
        setMotDePasse('');
      } else {
        const error = await response.json();
        console.error('Échec de la connexion:', error.message);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const Tab = createBottomTabNavigator();

  if (isLoggedIn) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'Profile') {
        iconName = 'person';
      } else if (route.name === 'Rechercher') {
        iconName = 'search';
      } else if (route.name === 'Combinaison') {
        iconName = 'options';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: '#007AFF',
    inactiveTintColor: '#8E8E93',
    labelStyle: { fontSize: 12, fontWeight: 'bold' },
    style: { backgroundColor: '#FFFFFF' },
  }}
>
        <Tab.Screen name="Profile">
          {() => <ProfileScreen loggedInProfEmail={loggedInProfEmail} />}
        </Tab.Screen>
        <Tab.Screen name="Rechercher" component={SearchPage} />
         <Tab.Screen name="Combinaison" component={Comb} />

      </Tab.Navigator>
    );
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Connectez-vous</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={motDePasse}
        onChangeText={setMotDePasse}
        secureTextEntry
      />
      <Button title="Se connecter" color="#40E0D0" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
 
   title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default LoginForm;
