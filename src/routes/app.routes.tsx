import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {useRealm} from '@realm/react';

import colors from '../consts/colors';
import {Trip} from '../models/Trip';
import {CheckIn} from '../screens/CheckIn';
import {CheckOut} from '../screens/CheckOut';
import {Home} from '../screens/Home';

type CheckOutProps = {
  _id: Realm.BSON.ObjectId;
  userId: Realm.BSON.ObjectId;
  carPlate: string;
  finality: string;
  checkInLat: number;
  CheckInLng: number;
  CheckInAt: Date;
  checkInAddress: string;
  CheckOutLat?: number;
  CheckOutLng?: number;
  checkOutAddress?: string;
  checkOutAt?: Date;
  active: Boolean;
};

type AppParamList = {
  Home: undefined;
  CheckIn: undefined;
  CheckOut: CheckOutProps;
};

export type CheckOutScreenProps = NativeStackScreenProps<
  AppParamList,
  'CheckOut'
>;

const Stack = createStackNavigator<AppParamList>();

export function AppRoutes() {
  const realm = useRealm();

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Trip));
    });

    console.log('app.routes.txt update');
  }, [realm]);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CheckIn" component={CheckIn} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
    </Stack.Navigator>
  );
}
