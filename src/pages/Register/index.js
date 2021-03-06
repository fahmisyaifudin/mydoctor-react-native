import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {colors, useForm} from '../../utils';
import {Firebase} from '../../config';
import {setLoading} from '../../redux/features/loadingSlice';

export default function Register({navigation}) {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const onContinue = () => {
    const auth = getAuth(Firebase);
    dispatch(setLoading(true));
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        const user = userCredential.user;
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: user.uid,
        };
        const db = getDatabase(Firebase);
        set(ref(db, 'users/' + user.uid), data);
        dispatch(setLoading(false));
        setForm('reset');
        //storeData('user', data);
        navigation.navigate('UploadPhoto', data);
      })
      .catch(error => {
        dispatch(setLoading(true));
        showMessage({
          message: error.message,
          type: 'default',
          backgroundColor: colors.error,
        });
      });
  };

  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      <View style={styles.content}>
        <Input
          label="Full Name"
          value={form.fullName}
          onChangeText={value => setForm('fullName', value)}
        />
        <Gap height={24} />
        <Input
          label="Pekerjaan"
          value={form.profession}
          onChangeText={value => setForm('profession', value)}
        />
        <Gap height={24} />
        <Input
          label="Email"
          value={form.email}
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          value={form.password}
          secureTextEntry
          onChangeText={value => setForm('password', value)}
        />
        <Gap height={40} />
        <Button title="Continue" onPress={onContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 40,
    paddingTop: 0,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
