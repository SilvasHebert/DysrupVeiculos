import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRealm} from '@realm/react';

import Car from '../assets/icons/car.svg';
import Key from '../assets/icons/key.svg';
import colors from '../consts/colors';
import {Trip} from '../models/Trip';

export function UserCar() {
  const {navigate} = useNavigation();
  const realm = useRealm();
  const tripObjects = realm.objects(Trip);

  const [trip, setTrip] = useState<Trip | null>(null);

  const changeFunction = () => {
    const filtredTrip = tripObjects.filtered('active == true')[0];
    setTrip(filtredTrip);
  };

  tripObjects.addListener(changeFunction);

  return trip ? (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => navigate('CheckOut')}>
      <View style={styles.iconContainer}>
        <Car />
      </View>
      <View style={styles.messageWrapper}>
        <Text style={styles.message}>
          Veículo {trip.carPlate} em uso,{' '}
          <Text style={styles.clickMessage}>
            Clique aqui para registrar chegada
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => navigate('CheckIn')}>
      <View style={styles.iconContainer}>
        <Key />
      </View>
      <View style={styles.messageWrapper}>
        <Text style={styles.message}>
          Nenhum veículo em uso.
          <Text style={styles.clickMessage}>
            Clique aqui para registrar saída
          </Text>
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
