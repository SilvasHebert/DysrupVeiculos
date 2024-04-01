import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Region} from 'react-native-maps';
import {useNavigation} from '@react-navigation/core';
import {useRealm, useUser} from '@realm/react';
import {BSON} from 'realm';

import {WatchPositionContext} from '../contexts/WatchPositionContext';
import {getAddressWithCoords} from '../utils/Location';

import {Button} from './Button';
import {Location} from './Location';
import {WrappedTextInput} from './WrappedTextInput';

type CheckInFormProps = {
  currentCoords: Region;
};

export function CheckInForm({currentCoords}: CheckInFormProps) {
  const {goBack} = useNavigation();
  const realm = useRealm();
  const user = useUser();

  const {watchPosition} = useContext(WatchPositionContext);

  const [carPlateInput, setCarPlateInput] = useState('');
  const [finalityInput, setFinalityInput] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    if (!currentCoords) {
      return;
    }

    getAddressWithCoords(currentCoords).then(response => {
      setCurrentAddress(response);
    });
  }, [currentCoords]);

  const validateData = () => {
    if (!currentCoords) {
      return false;
    }

    if (!carPlateInput) {
      Alert.alert('Alerta', 'Preencha a Placa do veículo', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
      return false;
    }

    if (!finalityInput) {
      Alert.alert('Alerta', 'Preencha a Finalidade', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
      return false;
    }

    return true;
  };

  const handleCheckIn = () => {
    if (!validateData()) {
      return;
    }

    const {latitude, longitude} = currentCoords;

    try {
      realm.write(() => {
        realm.create('Trip', {
          _id: new BSON.ObjectId(),
          userId: new BSON.ObjectId(user.id),
          carPlate: carPlateInput,
          finality: finalityInput,
          checkInLat: latitude,
          CheckInLng: longitude,
          checkInAddress: currentAddress,
          CheckInAt: new Date(),
          active: true,
        });
      });
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Alerta',
        'Não foi possivel registrar a Saída, tente novamente',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
      );
    } finally {
      watchPosition();
      goBack();
    }
  };

  return (
    <View style={styles.wrapper}>
      <Location>{currentAddress}</Location>
      <WrappedTextInput
        value={carPlateInput}
        onChangeText={setCarPlateInput}
        label="Placa do veículo"
        autoCapitalize={'characters'}
        maxLength={7}
        style={styles.customWrappedTextInput}
      />
      <WrappedTextInput
        value={finalityInput}
        onChangeText={setFinalityInput}
        label="Finalidade"
        placeholder="Vou utilizar o carro para..."
        maxLength={200}
        multiline
        numberOfLines={3}
      />
      <Button onPress={() => handleCheckIn()}>Registrar Saída</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
    padding: 32,
  },
  customWrappedTextInput: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
});
