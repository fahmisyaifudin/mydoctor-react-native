import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {getDatabase, ref, update} from 'firebase/database';
import {Header, Gap} from '../../components';
import {ILNullPhoto} from '../../assets/illustration';
import {IconAddPhoto, IconRemovePhoto} from '../../assets/icon';
import {Button, Link} from '../../components';
import {colors, fonts, storeData} from '../../utils';

export default function UploadPhoto({navigation, route}) {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoData, setPhotoData] = useState('');
  const {fullName, profession, uid, email} = route.params;

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
          setHasPhoto(true);
          setPhotoData(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
        }
      },
    );
  };

  const uploadAndContinue = () => {
    const db = getDatabase();
    const updates = {};
    const data = {
      fullName,
      profession,
      email,
      uid,
      photo: photoData,
    };
    updates['users/' + uid] = data;
    update(ref(db), updates);
    storeData('user', data);
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={uploadAndContinue}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
