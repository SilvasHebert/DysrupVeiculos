import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';

import {AppRoutes} from './src/routes/app.routes';
import {AuthRoutes} from './src/routes/auth.routes';

function App(): JSX.Element {
  const isSignedIn = false;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {isSignedIn ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

export default App;
