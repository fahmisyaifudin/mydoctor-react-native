import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Profile, Header, List, Gap} from '../../components';
import {colors} from '../../utils';

export default function UserProfile({navigation}) {
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile name="Shayna Melinda" desc="Product Designer" />
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last update yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Edit Profile"
        desc="Last update yesterday"
        type="next"
        icon="languange"
      />
      <List
        name="Edit Profile"
        desc="Last update yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Edit Profile"
        desc="Last update yesterday"
        type="next"
        icon="help"
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
