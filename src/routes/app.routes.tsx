import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useRealm} from '@realm/react';

import {OfflineIndicator} from '../components/OfflineIndicator';
import colors from '../consts/colors';
import {WatchPositionProvider} from '../contexts/WatchPositionContext';
import {Trip} from '../models/Trip';
import {CheckIn} from '../screens/CheckIn';
import {CheckOut} from '../screens/CheckOut';
import {Home} from '../screens/Home';
import {requestLocationPermissionANDROID} from '../utils/Location';

type AppParamList = {
  Home: undefined;
  CheckIn: undefined;
  CheckOut: {_id: Realm.BSON.ObjectId};
};

export type HomeScreenProps = NativeStackScreenProps<AppParamList, 'Home'>;

export type CheckOutScreenProps = NativeStackScreenProps<
  AppParamList,
  'CheckOut'
>;

const Stack = createNativeStackNavigator<AppParamList>();

export function AppRoutes() {
  const realm = useRealm();

  useEffect(() => {
    requestLocationPermissionANDROID();

    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Trip));
    });
  }, [realm]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          header: OfflineIndicator,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CheckIn" component={CheckIn} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
