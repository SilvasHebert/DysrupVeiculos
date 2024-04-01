import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Car from '../assets/icons/car.svg';
import Flag from '../assets/icons/flag.svg';
import colors from '../consts/colors';

export function OnGoingTrip({startingAddress, endAddress}) {
  console.log(startingAddress, endAddress);

  return (
    <View>
      <View style={styles.location}>
        <View style={styles.iconContainer}>
          <Car width={24} height={24} />
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>
            Saindo de {startingAddress.checkInAddress}
          </Text>
          <Text style={styles.address}>
            as{' '}
            {startingAddress.CheckInAt.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.location}>
        <View style={styles.iconContainer}>
          <Flag width={24} height={24} />
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>Chegando em {endAddress}</Text>
          <Text style={styles.address}>
            as{' '}
            {new Date().toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  location: {flexDirection: 'row', alignItems: 'center', gap: 12},
  iconContainer: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 6,
  },
  text: {
    flex: 1,
  },
  title: {
    color: colors.grayAlt,
    fontSize: 14,
  },
  address: {
    color: colors.gray,
    fontSize: 14,
  },
  line: {
    height: 63,
    width: 1,
    left: 24,
    backgroundColor: colors.icon,
  },
});
