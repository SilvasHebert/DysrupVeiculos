import {PermissionsAndroid} from 'react-native';
import {LatLng} from 'react-native-maps';

import {GoogleMapsAPIKey} from '../consts/tokens';

export const requestLocationPermissionANDROID = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return 'GRANTED';
  } else {
    return 'DENIED';
  }
};

export const getAddressWithCoords = async (coords: LatLng) => {
  if (!coords) {
    return;
  }

  const {latitude, longitude} = coords;

  const address = await fetch(
    `https://maps.google.com/maps/api/geocode/json?key=${GoogleMapsAPIKey}&latlng=${latitude}%2C${longitude}&region=BR&language=pt-BR`,
  ).then(response => response.json());

  return address.results[0].formatted_address;
};
