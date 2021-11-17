import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {ILLogo} from '../../assets';
import {colors} from '../../utils/colors';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('GetStarted');
        }
      });
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 20,
  },
});
