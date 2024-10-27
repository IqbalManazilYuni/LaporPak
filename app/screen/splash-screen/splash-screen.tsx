import {useNavigation, NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../navigator/AppNavigator';
import {LOGO, LOGOBAWAH} from '../../assets';
import {caladeaReguler} from '../../assets/fonts/FontFamily';
import {isLoggedIn} from '../../utils/auth'; // Pastikan untuk mengimpor isLoggedIn

const {width, height} = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      navigation.navigate('Login'); // Navigasi berdasarkan status login
    };

    const timer = setTimeout(checkLoginStatus, 3000); // Tunggu 3 detik sebelum memeriksa status

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.backgroundScreen}>
      <StatusBar backgroundColor={'#444444'} />
      <View style={styles.contentUp}>
        <View
          style={{
            marginTop: height * 0.2,
            width: '100%',
            alignItems: 'center',
          }}>
          <LOGO />
          <View style={styles.content}>
            <Text style={styles.fontTitle}>Lapor Pak Sumbar</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentDown}>
        <LOGOBAWAH />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundScreen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  fontTitle: {
    fontSize: height * 0.032,
    fontFamily: caladeaReguler,
    color: 'black',
  },
  contentUp: {
    height: '75%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentDown: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
