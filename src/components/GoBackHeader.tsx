import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../consts/colors';

type GoBackHeaderProps = {
  children: string;
};

export function GoBackHeader({children}: GoBackHeaderProps) {
  const {goBack} = useNavigation();

  return (
    <>
      <StatusBar backgroundColor={colors.background} />
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image source={require('../assets/images/arrow-left.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>{children}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 32,
  },
  title: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 20,
  },
});
