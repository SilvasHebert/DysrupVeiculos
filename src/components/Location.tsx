import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import Car from '../assets/icons/car.svg';
import colors from '../consts/colors';

type LocationProps = {
  children: string | null;
};

export function Location({children}: LocationProps) {
  return (
    <View style={styles.location}>
      <View style={styles.iconContainer}>
        <Car width={24} height={24} />
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>Localização atual</Text>
        {children ? (
          <Text style={styles.address}>{children}</Text>
        ) : (
          <ActivityIndicator />
        )}
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
});
