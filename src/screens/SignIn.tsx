import React from 'react';
import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Button} from '../components/Button';
import colors from '../consts/colors';

export function SignIn() {
  const background = require('../assets/images/background-croped.png');

  return (
    <ImageBackground source={background} style={styles.imageBackground}>
      <LinearGradient
        colors={['rgba(32, 32, 36, 0)', 'rgba(32, 32, 36, 0.8)']}
        style={styles.linearGradient}>
        <LinearGradient
          colors={['#000000FF', '#00000000']}
          style={styles.linearGradient}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.title}>Dysrup Veiculos</Text>
              <Text style={styles.phrase}>Gestão de uso de veículos</Text>
            </View>
            <Button>Entrar com Google</Button>
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