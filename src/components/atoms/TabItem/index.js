import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  IconDoctor,
  IconDoctorActive,
  IconHospitals,
  IconHospitalsActive,
  IconMessages,
  IconMessagesActive,
} from '../../../assets/icon';
import {colors, fonts} from '../../../utils';

export default function TabItem({title, active, onPress, onLongPress}) {
  const Icon = () => {
    if (title === 'Doctor') {
      return active ? <IconDoctorActive /> : <IconDoctor />;
    }
    if (title === 'Hospitals') {
      return active ? <IconHospitalsActive /> : <IconHospitals />;
    }
    if (title === 'Messages') {
      return active ? <IconMessagesActive /> : <IconMessages />;
    }
  };
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.container}>
        <Icon />
        <Text style={styles.text(active)}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: active => ({
    fontSize: 10,
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: fonts.primary[600],
    marginTop: 4,
  }),
});
