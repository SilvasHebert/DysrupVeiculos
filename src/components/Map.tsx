import React, {useEffect, useState} from 'react';
import {ActivityIndicator, PermissionsAndroid, StyleSheet} from 'react-native';
import MapView, {LatLng, Marker, Polyline, Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export function Map() {
  const [loading, setLoading] = useState(true);
  const [initialPos, setInitialPos] = useState<Region | undefined>();
  const [path, setPath] = useState<LatLng[]>([]);

  useEffect(() => {
    requestLocationPermissionANDROID().then(response => {
      if (response === 'GRANTED') {
        getCurrentLocation();
      }
    });
  }, []);

  const requestLocationPermissionANDROID = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return 'GRANTED';
    } else {
      return 'DENIED';
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      ({coords}: {coords: {latitude: number; longitude: number}}) => {
        console.log(coords);
        setInitialPos({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setLoading(false);
      },
      (error: any) => {
        console.log(error.code, error.message);
        setLoading(false);
      },
      {enableHighAccuracy: false, timeout: 15000},
    );
  };

  const addCoordinateToPath = (newCoordinate: LatLng | undefined) => {
    if (newCoordinate) {
      setPath([...path, newCoordinate]);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <MapView
      style={styles.map}
      region={initialPos}
      showsUserLocation={true}
      showsMyLocationButton={true}
      onUserLocationChange={event =>
        addCoordinateToPath(event.nativeEvent.coordinate)
      }>
      <Marker coordinate={initialPos} />
      <Polyline coordinates={path} strokeColor="#000" strokeWidth={3} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {flex: 1},
});
