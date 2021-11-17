import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getDatabase, ref, update} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';
import {ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData} from '../../utils';

export default function UpdateProfile({navigation}) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    uid: '',
    photo: ILNullPhoto,
  });
  const [password, setPassword] = useState('');
  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };
  const saveProfile = () => {
    const db = getDatabase();
    const updates = {};
    const data = profile;
    data.photo = profile.photo.uri;

    updates['users/' + profile.uid] = data;
    update(ref(db), updates)
      .then(() => {
        navigation.goBack('UserProfile');
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'default',
          backgroundColor: colors.error,
        });
      });
  };
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
      console.log(data);
    });
  }, []);
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={profile.photo} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disabled />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={() => saveProfile()} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
