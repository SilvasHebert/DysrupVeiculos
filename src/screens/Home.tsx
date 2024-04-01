import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useRealm} from '@realm/react';

import {Title} from '../components/Title';
import {TrackRecordItem} from '../components/TrackRecordItem';
import {UserCar} from '../components/UserCar';
import {UserHeader} from '../components/UserHeader';
import {Trip} from '../models/Trip';

export function Home() {
  const realm = useRealm();
  const trips = realm.objects(Trip);

  return (
    <>
      <UserHeader />
      <View style={styles.content}>
        <UserCar />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          data={trips.filtered('active == false').sorted('CheckInAt', true)}
          ListHeaderComponent={() => <Title>Histórico</Title>}
          stickyHeaderIndices={[0]}
          renderItem={({item}) => <TrackRecordItem item={item} />}
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
