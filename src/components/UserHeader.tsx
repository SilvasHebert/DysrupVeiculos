import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../consts/colors';

export function UserHeader() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/a/ACg8ocLVci0y5tbT5pcWF-MhZm1vn6ihz6kV7NHf6KwYuem9B60=s96-c',
          }}
          style={styles.userPhoto}
        />
        <View>
          <Text style={styles.hello}>Olá,</Text>
          <Text style={styles.name}>Hebert</Text>
        </View>
      </View>
      <View>
        <Icon name="power" color={colors.icon} size={32} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.secondary,
    width: '100%',
    padding: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  userPhoto: {
    height: 54,
    width: 54,
    borderRadius: 7,
  },
  hello: {
    color: colors.white,
    fontSize: 18,
  },
  name: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
  },
});
