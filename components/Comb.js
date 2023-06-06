import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle, Line } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';

const API_URL = 'https://tiny-worm-nightgown.cyclic.app/professeurs';

const Combinaison = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [specialites, setSpecialites] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setProfessors(jsonData);

      const uniqueSpecialites = [...new Set(jsonData.map((item) => item.specialite))];
      setSpecialites(uniqueSpecialites);
    } catch (error) {
      console.error(error);
    }
  };

  const filterProfessorsBySpeciality = () => {
    if (selectedSpeciality === '') {
      return professors;
    }
    return professors.filter((professor) => professor.specialite === selectedSpeciality);
  };

  const renderNodes = () => {
    const filteredProfessors = filterProfessorsBySpeciality();

    return filteredProfessors.map((professor, index) => {
      // Generate random positions for the nodes
      const cx = Math.random() * 300 + 50;
      const cy = Math.random() * 300 + 50;

      return (
        <Circle
          key={index}
          cx={cx}
          cy={cy}
          r={20}
          fill="#FF7F50" // Changer la couleur des cercles
          stroke="#FFFFFF" // Changer la couleur de la bordure des cercles
          strokeWidth={2} // Changer l'épaisseur de la bordure des cercles
        />
      );
    });
  };

  const renderLinks = () => {
    const links = [];
    const filteredProfessors = filterProfessorsBySpeciality();

    filteredProfessors.forEach((professor, index) => {
      const desiredCities = professor.villeDesiree.split(';');

      desiredCities.forEach((city) => {
        const targetProfessor = filteredProfessors.find((p) => p.villeFaculteActuelle === city);

        if (targetProfessor) {
          // Generate random positions for the start and end points of the line
          const x1 = Math.random() * 300 + 50;
          const y1 = Math.random() * 300 + 50;
          const x2 = Math.random() * 300 + 50;
          const y2 = Math.random() * 300 + 50;

          links.push(
            <Line
              key={`${index}-${targetProfessor.id}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#800080" // Changer la couleur des lignes
              strokeWidth={2} // Changer l'épaisseur des lignes
            />
          );
        }
      });
    });

    return links;
  };

  const handleSpecialityChange = (value) => {
    setSelectedSpeciality(value);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedSpeciality}
        onValueChange={handleSpecialityChange}
        style={styles.picker}
      >
        <Picker.Item label="Toutes les spécialités" value="" />
        {specialites.map((specialite, index) => (
          <Picker.Item key={index} label={specialite} value={specialite} />
        ))}
      </Picker>
      <Svg width="100%" height="100%">
        {renderNodes()}
        {renderLinks()}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  picker: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
});

export default Combinaison;
