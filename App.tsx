import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppProvider, RealmProvider, UserProvider} from '@realm/react';
import {OpenRealmBehaviorType} from 'realm';

import 'react-native-gesture-handler';

import {GoogleClientId, RealmAppId} from './src/consts/tokens';
import {WatchPositionProvider} from './src/contexts/WatchPositionContext';
import {Trip} from './src/models/Trip';
import {AppRoutes} from './src/routes/app.routes';
import {AuthRoutes} from './src/routes/auth.routes';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId: GoogleClientId,
      offlineAccess: true,
    });
  }, []);

  return (
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
          <WatchPositionProvider>
            <AppRoutes />
          </WatchPositionProvider>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

export default App;
