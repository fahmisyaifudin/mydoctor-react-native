import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {getDatabase, ref, child, get} from 'firebase/database';
import {DummyHospital1, DummyHospital2, DummyHospital3} from '../../assets';
import {ILHospitalBG} from '../../assets/illustration';
import {ListHospital} from '../../components';
import {colors, fonts} from '../../utils';

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'hospitals'))
      .then(snapshot => {
        if (snapshot.exists()) {
          setHospitals(snapshot.val());
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>{hospitals.length - 1} tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospitals.map((hospital, index) => {
          return (
            <ListHospital
              key={index}
              title="Rumah Sakit"
              name={hospital.name}
              address={hospital.address}
              pic={{uri: hospital.photo}}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
});
