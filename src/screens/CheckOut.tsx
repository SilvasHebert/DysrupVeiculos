import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Marker, Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useRealm} from '@realm/react';

import Cross from '../assets/icons/cross.svg';
import {Button} from '../components/Button';
import {FullLoading} from '../components/FullLoading';
import {GoBackHeader} from '../components/GoBackHeader';
import {Map} from '../components/Map';
import {OnGoingTrip} from '../components/OnGoingTrip';
import colors from '../consts/colors';
import {WatchPositionContext} from '../contexts/WatchPositionContext';
import {Trip} from '../models/Trip';
import {CheckOutScreenProps} from '../routes/app.routes';
import {getAddressWithCoords} from '../utils/Location';

export function CheckOut({navigation}: CheckOutScreenProps) {
  const realm = useRealm();
  const tripObjects = realm.objects(Trip);
  const currentTrip = tripObjects.filtered('active == true')[0];

  const {stopWatchPosition} = useContext(WatchPositionContext);

  const [loading, setLoading] = useState(true);
  const [actualPos, setActualPos] = useState<Region>();
  const [currentAddress, setCurrentAddress] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}: {coords: {latitude: number; longitude: number}}) => {
        setActualPos({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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

    getAddressWithCoords(actualPos)
      .then(response => {
        setCurrentAddress(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [actualPos]);

  const closeTrip = useCallback(() => {
    if (!actualPos) {
      return;
    }

    if (!currentTrip) {
      return;
    }

    stopWatchPosition();

    try {
      realm.write(() => {
        currentTrip.CheckOutLat = actualPos.latitude;
        currentTrip.CheckOutLng = actualPos.longitude;
        currentTrip.checkOutAt = new Date();
        currentTrip.active = false;
      });
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Alerta',
        'Não foi possivel registrar a Chegada, tente novamente',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
      );
    } finally {
      navigation.goBack();
    }
  }, [realm, actualPos, currentTrip, navigation]);

  if (!currentTrip) {
    return <></>;
  }

  if (loading) {
    return <FullLoading />;
  }

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <GoBackHeader>Chegada</GoBackHeader>

      {actualPos ? (
        <Map initialPos={actualPos}>
          <>
            <Marker coordinate={actualPos} />
            <Marker
              coordinate={{
                latitude: currentTrip.checkInLat,
                longitude: currentTrip.CheckInLng,
              }}
            />
          </>
        </Map>
      ) : (
        <></>
      )}

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
            <Cross />
          </TouchableOpacity>
          <Button
            onPress={() => {
              closeTrip();
            }}>
            Registrar Chegada
          </Button>
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
