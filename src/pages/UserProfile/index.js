import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getAuth, signOut} from 'firebase/auth';
import {ILNullPhoto} from '../../assets';
import {Profile, Header, List, Gap} from '../../components';
import {colors, getData} from '../../utils';

export default function UserProfile({navigation}) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });
  const actionLogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.replace('GetStarted');
    });
  };
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  }, []);
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last update yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Languange"
        desc="Last update yesterday"
        type="next"
        icon="languange"
      />
      <List
        name="Give Us Rate"
        desc="Last update yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Sign Out"
        desc="Last update yesterday"
        type="next"
        icon="help"
        onPress={actionLogOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
