import React, {useEffect} from 'react';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';

import {AppRoutes} from './src/routes/app.routes';
import {AuthRoutes} from './src/routes/auth.routes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppProvider} from '@realm/react';
import {GoogleClientId} from './src/consts/tokens';

function App(): JSX.Element {
  const isSignedIn = false;

  useEffect(() => {
    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId: GoogleClientId,
      offlineAccess: true,
      androidClientId:
        '499129071242-lorb1v2d7savu9924l648cnmcjc2gsfa.apps.googleusercontent.com',
    });
  }, []);

  return (
    <NavigationContainer>
      <AppProvider id={'application-0-oxqqy'}>
        {isSignedIn ? <AppRoutes /> : <AuthRoutes />}
      </AppProvider>
    </NavigationContainer>
  );
}

export default App;
