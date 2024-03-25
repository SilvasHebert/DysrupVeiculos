import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppProvider, RealmProvider, UserProvider} from '@realm/react';

import {AppRoutes} from './src/routes/app.routes';
import {AuthRoutes} from './src/routes/auth.routes';
import {GoogleClientId, RealmAppId, androidClientId} from './src/consts/tokens';
import {requestLocationPermissionANDROID} from './src/utils/Location';
import {OpenRealmBehaviorType} from 'realm';
import {Trip} from './src/models/Trip';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId: GoogleClientId,
      androidClientId: androidClientId,
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
