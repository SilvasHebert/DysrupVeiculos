import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import colors from '../consts/colors';
import {HistoryItem} from './HistoryItem';
import {Title} from './Title';

export function History() {
  const data = [
    {
      status: true,
      plate: 'XXX-000',
      datetime: new Date(),
    },
    {
      status: true,
      plate: 'XXX-000',
      datetime: new Date(),
    },
    {
      status: true,
      plate: 'XXX-000',
      datetime: new Date(),
    },
    {
      status: true,
      plate: 'XXX-000',
      datetime: new Date(),
    },
    {
      status: true,
      plate: 'XXX-000',
      datetime: new Date(),
    },
    {
      status: true,
      plate: 'XXX-000',
      datetime: new Date(),
    },
  ];

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      data={data}
      ListHeaderComponent={() => <Title>Histórico</Title>}
      stickyHeaderIndices={[0]}
      renderItem={({item}) => <HistoryItem data={item} />}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 32,
    flexGrow: 1,
    overflow: 'scroll',
  },
});
