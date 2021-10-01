import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors} from '../../utils';

export default function DoctorProfile({navigation}) {
  return (
    <View style={styles.container}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile name="Nairobi Putri Haza" desc="Dokter Anak" />
      <Gap height={10} />
      <ProfileItem label="Alumnus" value="Universitas Indonesia, 2020" />
      <ProfileItem label="Tempat Praktik" value="Rumah Sakit Umum, Bandung" />
      <ProfileItem label="No. STR" value="0000116622081996" />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chatting')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
