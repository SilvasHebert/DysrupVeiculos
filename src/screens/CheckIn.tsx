import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import {CheckInForm} from '../components/CheckInForm';
import {GoBackHeader} from '../components/GoBackHeader';
import {Map} from '../components/Map';

export function CheckIn() {
  const [initialPos, setInitialPos] = useState<Region>();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}: {coords: {latitude: number; longitude: number}}) => {
        setInitialPos({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      (error: any) => {
        console.log('Geolocation', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  }, []);

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <GoBackHeader>Saída</GoBackHeader>

      {initialPos ? (
        <>
          <Map initialPos={initialPos} />
          <CheckInForm currentCoords={initialPos} />
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
});
