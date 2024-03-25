import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {HistoryItem} from './HistoryItem';
import {Title} from './Title';

export function History({trips}) {
  if (!trips || !trips.length) {
    return;
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      data={trips}
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
