import React, {ReactElement, useContext, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {
  LatLng,
  MapViewProps,
  Polyline,
  Region,
} from 'react-native-maps';

import colors from '../consts/colors';
import {WatchPositionContext} from '../contexts/WatchPositionContext';

type MapProps = {
  initialPos: Region | undefined;
  children?: ReactElement;
  props?: MapViewProps;
};

export function Map({initialPos, children, ...props}: MapProps) {
  const {routes} = useContext(WatchPositionContext);

  const [path, setPath] = useState<LatLng[]>([]);

  const addCoordinateToPath = (newCoordinate: LatLng | undefined) => {
    if (newCoordinate) {
      setPath([...path, newCoordinate]);
    }
  };

  if (!initialPos) {
    return <></>;
  }

  return (
    <View style={styles.wrapper}>
      <MapView
        style={styles.map}
        region={initialPos}
        showsUserLocation={true}
        showsMyLocationButton={true}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        onUserLocationChange={event =>
          addCoordinateToPath(event.nativeEvent.coordinate)
        }
        {...props}>
        {children}
        <Polyline
          coordinates={routes}
          strokeColors={[colors.primary]}
          strokeWidth={6}
        />
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
