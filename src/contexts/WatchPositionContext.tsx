import React, {createContext, ReactNode, useState} from 'react';
import {LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export type WatchPositionContextType = {
  routes: LatLng[];
  watchPosition: () => void;
  stopWatchPosition: () => void;
};

export type WatchPositionProviderProps = {
  children: ReactNode;
};

export const WatchPositionContext = createContext<
  WatchPositionContextType | undefined
>(undefined);

export const WatchPositionProvider = ({
  children,
}: WatchPositionProviderProps) => {
  const [routes, setRoutes] = useState<LatLng[]>([]);
  const [Id, setId] = useState(null);

  const watchPosition = () => {
    const id = Geolocation.watchPosition(
      coordenate => {
        console.log(coordenate);
        setRoutes([
          ...routes,
          {
            latitude: coordenate.latitude,
            longitude: coordenate.longitude,
          },
        ]);
      },
      () => {},
      {
        enableHighAccuracy: true,
      },
    );

    setId(id);
  };

  const stopWatchPosition = () => {
    if (Id) {
      Geolocation.clearWatch(Id);
    }
  };

  return (
    <WatchPositionContext.Provider
      value={{routes, watchPosition, stopWatchPosition}}>
      {children}
    </WatchPositionContext.Provider>
  );
};
