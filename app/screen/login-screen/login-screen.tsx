import React from 'react';
import {
  Button,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconLock, IconUsername, LOGO} from '../../assets';
import {
  caladeaBold,
  caladeaReguler,
  ramarajaReguler,
} from '../../assets/fonts/FontFamily';
const {width, height} = Dimensions.get('window');
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

export const LoginScreen = ({}) => {
  const navigation = useNavigation();
  const handleNextPageDaftar = () => {
    navigation.navigate('Register');
  };
  return (
    <SafeAreaView style={styles.backgroundScreen}>
      <StatusBar backgroundColor={'#444444'} />
      <View style={styles.contentUp}>
        <Text
          style={{
            fontSize: height * 0.032,
            fontFamily: ramarajaReguler,
            color: 'black',
          }}>
          Lapor Pak Sumbar
        </Text>
        <LOGO />
      </View>
      <View style={styles.contentDown}>
        <Text
          style={{
            fontSize: height * 0.025,
            fontFamily: caladeaBold,
            color: '#1C2A3A',
            marginTop: height * 0.02,
          }}>
          Selamat Datang!
        </Text>
        <Text
          style={{
            fontFamily: caladeaReguler,
            fontSize: height * 0.016,
            marginTop: height * 0.02,
            color: '#6B7280',
          }}>
          Masukkan Username dan Passwordmu
        </Text>
        <Formik
          initialValues={{username: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={values => {
            // Proses pengiriman data
            console.log(values);
            navigation.navigate("Home")
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View
                style={[
                  styles.contentInput,
                  {
                    borderColor:
                      touched.username && errors.username ? 'red' : '#D1D5DB',
                  },
                ]}>
                <View
                  style={{
                    width: '15%',
                    height: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingRight: 10,
                  }}>
                  <IconUsername />
                </View>
                <View style={{width: '85%'}}>
                  <TextInput
                    style={{
                      width: '98%',
                      fontFamily: caladeaReguler,
                      color: '#9CA3AF',
                    }}
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.contentInput,
                  {
                    borderColor:
                      touched.username && errors.username ? 'red' : '#D1D5DB',
                  },
                ]}>
                <View
                  style={{
                    width: '15%',
                    height: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingRight: 10,
                  }}>
                  <IconLock />
                </View>
                <View style={{width: '85%'}}>
                  <TextInput
                    style={{
                      width: '98%',
                      fontFamily: caladeaReguler,
                      color: '#9CA3AF',
                    }}
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={() => handleSubmit()}>
                <Text
                  style={{
                    fontFamily: caladeaBold,
                    fontSize: height * 0.018,
                    color: 'white',
                  }}>
                  Masuk
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <View
          style={{
            marginTop: height * 0.05,
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: caladeaReguler,
              fontSize: height * 0.016,
              color: '#6B7280',
              marginRight: 2,
            }}>
            Belum punya akun?
          </Text>
          <TouchableOpacity onPress={handleNextPageDaftar}>
            <Text
              style={{
                fontFamily: caladeaBold,
                fontSize: height * 0.016,
                color: 'black',
              }}>
              DAFTAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username harus lebih dari 3 karakter!')
    .required('Username wajib diisi'),
  password: Yup.string()
    .min(6, 'Password harus lebih dari 6 karakter!')
    .required('Password wajib diisi'),
});
const styles = StyleSheet.create({
  backgroundScreen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  contentUp: {
    height: '42%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contentDown: {
    height: '58%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentInput: {
    width: '80%',
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    height: 45,
    marginTop: height * 0.025,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  buttonSubmit: {
    backgroundColor: '#EBC830',
    width: '80%',
    height: 44,
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.02,
  },
});
