import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useRealm} from '@realm/react';

import {Title} from '../components/Title';
import {TrackRecordItem} from '../components/TrackRecordItem';
import {UserCar} from '../components/UserCar';
import {UserHeader} from '../components/UserHeader';

export function Home() {
  const realm = useRealm();
  const trips = realm.objects('Trip');
  const currentTrip = trips.filtered('active == true')[0];
  const oldTrips = trips.filtered('active == false');

  return (
    <>
      <UserHeader />
      <View style={styles.content}>
        <UserCar trip={currentTrip} />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          data={oldTrips}
          ListHeaderComponent={() => <Title>Histórico</Title>}
          stickyHeaderIndices={[0]}
          renderItem={({item}) => <TrackRecordItem data={item} />}
        />
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
  flatListContent: {
    gap: 12,
    paddingBottom: 32,
    flexGrow: 1,
    overflow: 'scroll',
  },
});
