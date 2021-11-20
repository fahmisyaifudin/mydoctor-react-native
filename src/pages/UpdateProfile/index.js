import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getDatabase, ref, update} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData, storeData} from '../../utils';

export default function UpdateProfile({navigation}) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    uid: '',
  });
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoData, setPhotoData] = useState('');
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
    data.photo = photoData;
    updates['users/' + profile.uid] = data;
    update(ref(db), updates)
      .then(() => {
        storeData('user', data);
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

  const getImage = () => {
    launchImageLibrary(
      {maxWidth: 200, maxHeight: 200, quality: 0.5, includeBase64: true},
      response => {
        if (response.didCancel || response.errorMessage) {
          showMessage({
            message: 'Oops, Sepertinya anda tidak memilih fotonya?',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          const source = {uri: response.assets[0].uri};
          setPhoto(source);
          setPhotoData(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
        }
      },
    );
  };

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setPhotoData(res.photo);
      setProfile(data);
    });
  }, []);
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
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
