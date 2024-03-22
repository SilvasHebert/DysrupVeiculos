import React from 'react';

import {UserHeader} from '../components/UserHeader';
import {UserCar} from '../components/UserCar';
import {History} from '../components/History';
import {StyleSheet, View} from 'react-native';

export function Home() {
  return (
    <>
      <UserHeader />
      <View style={styles.content}>
        <UserCar />
        <History />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 32,
    paddingBottom: 0,
    gap: 32,
    flex: 1,
  },
});
