import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import colors from '../consts/colors';

type Button = {
  props?: TouchableOpacityProps;
  children: string;
};

export function Button({props, children}: Button) {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.gray,
  },
});
