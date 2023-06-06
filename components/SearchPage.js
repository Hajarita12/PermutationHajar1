import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_URL = 'https://tiny-worm-nightgown.cyclic.app/professeurs';

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [specialiteFilter, setSpecialiteFilter] = useState('');
  const [villeFaculteActuelleFilter, setVilleFaculteActuelleFilter] = useState('');
  const [villeDesireeFilter, setVilleDesireeFilter] = useState('');
  const [specialites, setSpecialites] = useState([]);
  const [villesFaculteActuelle, setVillesFaculteActuelle] = useState([]);
  const [villesDesirees, setVillesDesirees] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [specialiteFilter, villeFaculteActuelleFilter, villeDesireeFilter]);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setData(jsonData);

      // Récupérer les valeurs uniques pour les options des menus déroulants
      const uniqueSpecialites = Array.from(new Set(jsonData.map(item => item.specialite)));
      const uniqueVillesFaculteActuelle = Array.from(
        new Set(jsonData.map(item => item.villeFaculteActuelle))
      );
      const uniqueVillesDesirees = Array.from(new Set(jsonData.map(item => item.villeDesiree)));

      setSpecialites(uniqueSpecialites);
      setVillesFaculteActuelle(uniqueVillesFaculteActuelle);
      setVillesDesirees(uniqueVillesDesirees);

      setFilteredData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const applyFilters = () => {
    let filteredItems = data;

    if (specialiteFilter) {
      filteredItems = filteredItems.filter(
        item => item.specialite.toLowerCase() === specialiteFilter.toLowerCase()
      );
    }

    if (villeFaculteActuelleFilter) {
      filteredItems = filteredItems.filter(
        item => item.villeFaculteActuelle.toLowerCase() === villeFaculteActuelleFilter.toLowerCase()
      );
    }

    if (villeDesireeFilter) {
      filteredItems = filteredItems.filter(
        item => item.villeDesiree.toLowerCase() === villeDesireeFilter.toLowerCase()
      );
    }

    setFilteredData(filteredItems);
  };

  const renderItem = ({ item, index }) => {
    const {
      nom,
      prenom,
      email,
      tel,
      grade,
      specialite,
      faculteActuelle,
      villeFaculteActuelle,
      villeDesiree,
    } = item;

    const contactInfo = `${email} | ${tel} | ${grade}`;
    const educationalInfo = `${specialite} - (${faculteActuelle} | ${villeFaculteActuelle})`;

    const listItemText = `${nom} ${prenom} (${contactInfo}) - ${educationalInfo} ---> ${villeDesiree}`;

    const listItemStyle = index % 2 === 0 ? styles.listItemEven : styles.listItemOdd;

    return (
      <View style={[styles.listItem, listItemStyle]}>
        <View style={styles.bullet} />
        <Text style={styles.listItemText}>{listItemText}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Spécialité:</Text>
          <Picker
            style={styles.picker}
            selectedValue={specialiteFilter}
            onValueChange={value => setSpecialiteFilter(value)}
          >
            <Picker.Item label="Toutes les spécialités" value="" />
            {specialites.map((specialite, index) => (
              <Picker.Item key={index} label={specialite} value={specialite} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Ville faculté actuelle:</Text>
          <Picker
            style={styles.picker}
            selectedValue={villeFaculteActuelleFilter}
            onValueChange={value => setVilleFaculteActuelleFilter(value)}
          >
            <Picker.Item label="Toutes les villes" value="" />
            {villesFaculteActuelle.map((ville, index) => (
              <Picker.Item key={index} label={ville} value={ville} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Ville désirée:</Text>
          <Picker
            style={styles.picker}
            selectedValue={villeDesireeFilter}
            onValueChange={value => setVilleDesireeFilter(value)}
          >
            <Picker.Item label="Toutes les villes" value="" />
            {villesDesirees.map((ville, index) => (
              <Picker.Item key={index} label={ville} value={ville} />
            ))}
          </Picker>
        </View>
      </View>
      <Text style={styles.resultText}>Résultat de la recherche</Text>
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item.id || index}`}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  filters: {
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerLabel: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
  },
  picker: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
  },
  listItemEven: {
    backgroundColor: '#fff',
  },
  listItemOdd: {
    backgroundColor: '#f2f2f2',
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginRight: 10,
  },
  listItemText: {
    fontSize: 16,
  },
  resultText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SearchPage;
