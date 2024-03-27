import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider, RealmProvider, UserProvider} from '@realm/react';
import {OpenRealmBehaviorType} from 'realm';

import 'react-native-gesture-handler';

import {androidClientId, GoogleClientId, RealmAppId} from './src/consts/tokens';
import {Trip} from './src/models/Trip';
import {AppRoutes} from './src/routes/app.routes';
import {AuthRoutes} from './src/routes/auth.routes';
import {requestLocationPermissionANDROID} from './src/utils/Location';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId: GoogleClientId,
      offlineAccess: true,
    });

    requestLocationPermissionANDROID();
  }, []);

  return (
    <NavigationContainer>
      <AppProvider id={RealmAppId}>
        <UserProvider fallback={<AuthRoutes />}>
          <RealmProvider
            schema={[Trip]}
            sync={{
              flexible: true,
              newRealmFileBehavior: {
                type: OpenRealmBehaviorType.DownloadBeforeOpen,
              },
              existingRealmFileBehavior: {
                type: OpenRealmBehaviorType.OpenImmediately,
              },
            }}>
            <AppRoutes />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </NavigationContainer>
  );
}

export default App;
