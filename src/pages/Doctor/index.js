import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  DoctorCategory,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';

export default function Doctor() {
  return (
    <View>
      <HomeProfile />
      <Text>Mau konsultasi dengan siapa hari ini ?</Text>
      <DoctorCategory />
      <DoctorCategory />
      <DoctorCategory />
      <DoctorCategory />
      <Text>Top Rated Doctors</Text>
      <RatedDoctor />
      <RatedDoctor />
      <RatedDoctor />
      <Text>Good News</Text>
      <NewsItem />
      <NewsItem />
    </View>
  );
}

const styles = StyleSheet.create({});
