import React from 'react';
import {
  Alert,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useAuth} from '@realm/react';

import {Button} from '../components/Button';
import colors from '../consts/colors';

export function SignIn() {
  const {logInWithGoogle, result} = useAuth();

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.idToken) {
        logInWithGoogle({idToken: userInfo.idToken});
      }
    } catch (error) {
      signInErrorHandler(error);
    }
  };

  const signInErrorHandler = (error: any) => {
    if (!error || !error?.code) {
      return;
    }

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('Alerta', 'Google Play Services não disponível', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    } else {
      Alert.alert(
        'Alerta',
        'Não foi possivel realizar o Login com o Google, favor tente novamente',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
      );
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/background-croped.png')}
      style={styles.imageBackground}>
      <StatusBar backgroundColor={colors.black} />
      <LinearGradient
        colors={['rgba(32, 32, 36, 0)', 'rgba(32, 32, 36, 0.8)']}
        style={styles.linearGradient}>
        <LinearGradient
          colors={[colors.black + 'FF', colors.black + '00']}
          style={styles.linearGradient}>
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.title}>Dysrup Veiculos</Text>
              <Text style={styles.phrase}>Gestão de uso de veículos</Text>
            </View>
            <Button
              disabled={result.pending}
              onPress={() => {
                signInGoogle();
              }}>
              Entrar com Google
            </Button>
          </View>
        </LinearGradient>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  wrapper: {
    top: 88,
    gap: 36,
    padding: 52,
  },
  title: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 44,
    textAlign: 'center',
  },
  phrase: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
});
