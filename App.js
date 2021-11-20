import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import {Loading} from './src/components';
import {store} from './src/redux/store';

export default function App() {
  const MainApp = () => {
    const loading = useSelector(state => state.loading);
    return (
      <>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
        <FlashMessage position="top" />
        {loading.status && <Loading />}
      </>
    );
  };
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
