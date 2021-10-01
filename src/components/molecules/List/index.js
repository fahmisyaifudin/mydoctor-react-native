import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {
  IconNext,
  IconLanguange,
  IconRate,
  IconHelp,
  IconEditProfile,
} from '../../../assets/icon';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function List({profile, name, desc, type, onPress, icon}) {
  const Icon = () => {
    if (icon === 'edit-profile') {
      return <IconEditProfile />;
    }

    if (icon === 'languange') {
      return <IconLanguange />;
    }

    if (icon === 'rate') {
      return <IconRate />;
    }

    if (icon === 'help') {
      return <IconHelp />;
    }

    return <IconEditProfile />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : <Image source={profile} style={styles.avatar} />}
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {type === 'next' && <IconNext />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
  },
});
