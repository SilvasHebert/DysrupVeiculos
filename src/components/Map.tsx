import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {LatLng, Region} from 'react-native-maps';

type MapProps = {initialPos: Region | undefined};

export function Map({initialPos}: MapProps) {
  const [path, setPath] = useState<LatLng[]>([]);

  const addCoordinateToPath = (newCoordinate: LatLng | undefined) => {
    if (newCoordinate) {
      setPath([...path, newCoordinate]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <MapView
        style={styles.map}
        region={initialPos}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onUserLocationChange={event =>
          addCoordinateToPath(event.nativeEvent.coordinate)
        }>
        {/* <Polyline coordinates={path} strokeColor="#000" strokeWidth={3} /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('window').height / 4,
  },
  map: {flex: 1},
});
