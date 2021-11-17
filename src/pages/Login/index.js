import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {ILLogo} from '../../assets';
import {Input, Link, Button, Gap, Loading} from '../../components';
import {colors, fonts, storeData, useForm} from '../../utils';
import {getDatabase, ref, child, get} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';

export default function Login({navigation}) {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const loginAction = () => {
    const auth = getAuth();
    setLoading(true);
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`)).then(res => {
          setLoading(false);
          if (res.exists()) {
            const data = res.val();
            data.uid = user.uid;
            storeData('user', res.val());
          }
          navigation.navigate('MainApp');
        });
      })
      .catch(error => {
        setLoading(false);
        showMessage({
          message: error.message,
          type: 'default',
          backgroundColor: colors.error,
        });
      });
  };

  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ILLogo />
          <Text style={styles.title}>Masuk dan Mulai berkonsultasi</Text>
          <Input
            label="Email Address"
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
          <Gap height={10} />
          <Link title="Forgot my password" size={12} />
          <Gap height={40} />
          <Button title="Sign In" onPress={loginAction} />
          <Gap height={30} />
          <Link
            title="Create new account"
            size={16}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
});
