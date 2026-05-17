import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
    
      try {
        const token = await AsyncStorage.getItem('@artconnect:token');

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (token) {
          router.replace('/home');
        } else {
          router.replace('/login');
        }
      } catch {
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {loading && <ActivityIndicator size="large" color="#fff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
});