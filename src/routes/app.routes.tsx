import React, {useEffect} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import colors from '../consts/colors';
import {Home} from '../screens/Home';
import {Trip} from '../models/Trip';
import {CheckIn} from '../screens/CheckIn';
import {CheckOut} from '../screens/CheckOut';

import {useQuery} from '@realm/react';

const Stack = createStackNavigator();

export function AppRoutes() {
  const trip = useQuery(Trip);

  useEffect(() => {
    trip.subscribe();
  }, [trip]);

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
