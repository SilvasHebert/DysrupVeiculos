import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import {Button} from '../components/Button';
import {GoBackHeader} from '../components/GoBackHeader';
import {Map} from '../components/Map';
import {OnGoingTrip} from '../components/OnGoingTrip';
import colors from '../consts/colors';
import {CheckOutScreenProps} from '../routes/app.routes';
import {getAddressWithCoords} from '../utils/Location';

export function CheckOut({route}: CheckOutScreenProps) {
  const currentTrip = route.params;
  const [actualPos, setActualPos] = useState<Region>();
  const [currentAddress, setCurrentAddress] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}: {coords: {latitude: number; longitude: number}}) => {
        setActualPos({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      },
      (error: any) => {
        console.log('Geolocation', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  }, []);

  useEffect(() => {
    if (!actualPos) {
      return;
    }

    getAddressWithCoords(actualPos).then(response => {
      setCurrentAddress(response);
    });
  }, [actualPos]);

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <GoBackHeader>Chegada</GoBackHeader>

      {actualPos ? <Map initialPos={actualPos} /> : <></>}

      <View style={styles.checkOutInfo}>
        <OnGoingTrip
          endAddress={currentAddress}
          startingAddress={currentTrip}
        />
        <View>
          <Text style={styles.inputTitle}>Placa do Veiculo</Text>
          <Text style={styles.carPlate}>{currentTrip.carPlate}</Text>
        </View>
        <View>
          <Text style={styles.inputTitle}>Finalidade</Text>
          <Text style={styles.finality}>{currentTrip.finality}</Text>
        </View>
        <View>
          <Text style={styles.status}>Sincronização pendente</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancel} onPress={() => {}}>
            <Image source={require('../assets/images/cross.png')} />
          </TouchableOpacity>
          <Button onPress={() => {}}>Registrar Chegada</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  checkOutInfo: {
    flex: 1,
    padding: 32,
    gap: 32,
  },
  inputTitle: {
    fontSize: 14,
    color: colors.grayAlt,
    lineHeight: 22.4,
  },
  carPlate: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.carPlate,
  },
  finality: {
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.gray,
  },
  status: {
    color: colors.grayAlt,
    fontSize: 14,
    textAlign: 'center',
  },
  buttons: {
    gap: 16,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  cancel: {
    width: 56,
    height: 56,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
  },
});
