import React, {useEffect} from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
    </SafeAreaView>
  );
}

export default App;
