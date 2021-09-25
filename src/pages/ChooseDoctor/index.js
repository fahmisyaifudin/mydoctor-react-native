import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DummyDoctor6} from '../../assets';
import {Header, ListDoctor} from '../../components';
import {colors} from '../../utils';

export default function ChooseDoctor({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        title="Pilih Dokter Anak"
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor6}
        name="Alexander Jenie"
        desc="Wanita"
        onPress={() => navigation.navigate('Chatting')}
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor6}
        name="Alexander Jenie"
        desc="Wanita"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor6}
        name="Alexander Jenie"
        desc="Wanita"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor6}
        name="Alexander Jenie"
        desc="Wanita"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor6}
        name="Alexander Jenie"
        desc="Wanita"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
