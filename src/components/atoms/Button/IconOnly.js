import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconBackDark} from '../../../assets/icon';

export default function IconOnly({icon, onPress}) {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <IconBackDark />;
    }
    return <IconBackDark />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
}
