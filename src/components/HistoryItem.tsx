import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import colors from '../consts/colors';

export function HistoryItem({data}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.messageWrapper}>
        <Text style={styles.plate}>{data.plate}</Text>
        <Text style={styles.date}>
          Saída em {data.datetime.getUTCDate()}/
          {data.datetime.getUTCMonth() + 1} às
        </Text>
      </View>
      {false ? (
        <Image source={require('../assets/images/clock.png')} />
      ) : (
        <Image source={require('../assets/images/check.png')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.secondary,
    padding: 22,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  messageWrapper: {
    flex: 1,
  },
  plate: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 22.4,
    fontWeight: '700',
  },
  date: {
    color: colors.gray,
    fontSize: 12,
    lineHeight: 19.2,
  },
});
