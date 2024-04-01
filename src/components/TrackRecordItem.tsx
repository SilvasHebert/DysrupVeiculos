import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Check from '../assets/icons/check.svg';
import Clock from '../assets/icons/clock.svg';
import colors from '../consts/colors';
import {TripType} from '../models/Trip';

type TrackRecordItemProps = {
  item: TripType;
};

export function TrackRecordItem({item}: TrackRecordItemProps) {
  if (!item) {
    return <></>;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.messageWrapper}>
        <Text style={styles.plate}>{item.carPlate}</Text>
        {item.CheckInAt ? (
          <Text style={styles.date}>
            Saída em {item.CheckInAt.toLocaleDateString('pt-BR')} às{' '}
            {item.CheckInAt.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        ) : (
          <></>
        )}
      </View>
      {false ? <Clock /> : <Check />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.secondary,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
  },
  messageWrapper: {
    flex: 1,
    gap: 6,
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
