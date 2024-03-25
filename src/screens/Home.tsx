import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useRealm} from '@realm/react';

import {Trip} from '../models/Trip';
import {UserHeader} from '../components/UserHeader';
import {UserCar} from '../components/UserCar';
import {History} from '../components/History';

export function Home() {
  const realm = useRealm();
  const trips = realm.objects(Trip);
  const oldTrips = trips.filtered('active == false');
  const currentTrip = trips.filtered('active == true')[0];

  return (
    <>
      <UserHeader />
      <View style={styles.content}>
        <UserCar trip={currentTrip} />
        <History trips={oldTrips} />
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
