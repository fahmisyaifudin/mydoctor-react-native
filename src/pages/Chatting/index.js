import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from '../../components';
import ChatItem from '../../components/molecules/ChatItem';
import InputChat from '../../components/molecules/InputChat';
import {colors, fonts} from '../../utils';

export default function Chatting({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        title="Nairobi Putri Hayza"
        type="dark-profile"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.chatDate}>Senin, 21 Maret, 2021</Text>
        <ChatItem isMe />
        <ChatItem />
        <ChatItem isMe />
      </View>
      <InputChat />
    </View>
  );
}

const styles = StyleSheet.create({
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
