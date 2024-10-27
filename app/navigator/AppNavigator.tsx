import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screen/Home-screen/home';
import {SplashScreen} from '../screen/splash-screen/splash-screen';
import {LoginScreen} from '../screen/login-screen/login-screen';
import {RegisterScreen} from '../screen/register-screen/register-screen';
import {PengaduanScreen} from '../screen/pengaduan-screen/pengaduan-screen';
import {TambahPengaduanScreen} from '../screen/pengaduan-screen/tambah-pengaduan-screen';
import {DetailPengaduanScreen} from '../screen/pengaduan-screen/detail-pengaduan-screen';
import {SertifikatScreen} from '../screen/sertifikat-screen/sertifikat-screen';
import {DetailSertifikatScreen} from '../screen/sertifikat-screen/detail-sertifikat-screen';
import {NotifikasiScreen} from '../screen/notifikasi-screen/notifikasi-screent';
import {ProfileScreen} from '../screen/profile-screen/profile-screent';
import {isLoggedIn} from '../utils/auth';
import Loading from '../components/loading/Loading';

export type RootStackParamList = {
  Home: undefined;
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Pengaduan: undefined;
  TambahPengaduan: undefined;
  DetailPengaduan: undefined;
  Sertifikat: undefined;
  DetailSertifikat: undefined;
  Notifikasi: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLoggedIn();
      setIsAuthenticated(loggedIn);
    };
    checkLoginStatus();
  }, []);

  if (isAuthenticated === null) {
    // Jika status autentikasi belum diketahui, arahkan ke Login
    return <Loading />;
  }

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Pengaduan" component={PengaduanScreen} />
          <Stack.Screen
            name="TambahPengaduan"
            component={TambahPengaduanScreen}
          />
          <Stack.Screen
            name="DetailPengaduan"
            component={DetailPengaduanScreen}
          />
          <Stack.Screen name="Sertifikat" component={SertifikatScreen} />
          <Stack.Screen name="Notifikasi" component={NotifikasiScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="DetailSertifikat"
            component={DetailSertifikatScreen}
          />
        </>
      ) : (
        // Jika tidak terautentikasi, navigasi ke Login
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
