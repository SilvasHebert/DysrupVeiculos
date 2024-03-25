import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth, useUser} from '@realm/react';

import colors from '../consts/colors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export function UserHeader() {
  const user = useUser();
  const {logOut} = useAuth();

  const [loading, setLoading] = useState(true);

  GoogleSignin.getCurrentUser()
    .then(response => {
      user.profile.photo = response?.user.photo;
    })
    .finally(() => setLoading(false));

  return (
    <View style={styles.wrapper}>
      <View style={styles.userInfo}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Image
            source={{
              uri: user.profile.photo,
            }}
            style={styles.userPhoto}
          />
        )}

        <View>
          <Text style={styles.hello}>Olá,</Text>
          <Text style={styles.name}>{user.profile.name}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => logOut()}>
        <Icon name="power" color={colors.icon} size={32} />
      </TouchableOpacity>
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
