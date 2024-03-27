import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import colors from '../consts/colors';

export function UserCar({trip}) {
  const {navigate} = useNavigation();

  const message = trip
    ? `Veículo ${trip.carPlate} em uso, `
    : 'Nenhum veículo em uso.';

  const clickMessage = `Clique aqui para registrar a ${
    trip ? 'chegada' : 'saída'
  }.`;

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => (trip ? navigate('CheckOut', trip) : navigate('CheckIn'))}>
      <View style={styles.iconContainer}>
        {trip ? (
          <Image source={require('../assets/images/big-car.png')} />
        ) : (
          <Image source={require('../assets/images/key.png')} />
        )}
      </View>
      <View style={styles.messageWrapper}>
        <Text style={styles.message}>
          {message} <Text style={styles.clickMessage}>{clickMessage}</Text>
        </Text>
      </View>
    </TouchableOpacity>
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
  iconContainer: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 6,
    padding: 10,
  },
  messageWrapper: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 22.4,
    fontWeight: '400',
  },
  clickMessage: {
    color: colors.primary,
    fontSize: 14,
    lineHeight: 22.4,
    fontWeight: '700',
  },
});
