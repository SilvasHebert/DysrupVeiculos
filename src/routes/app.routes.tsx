import React from 'react';
import {StatusBar} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import colors from '../consts/colors';
import {Home} from '../screens/Home';
import {CheckIn} from '../screens/CheckIn';

const Stack = createStackNavigator();

export function AppRoutes() {
  return (
    <>
      <StatusBar backgroundColor={colors.secondary} />
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
      </Stack.Navigator>
    </>
  );
}
