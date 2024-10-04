import React from 'react';
import {
  Button,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconHouse, IconHp, IconLock, IconPeople, IconUsername, LOGO} from '../../assets';
import {
  caladeaBold,
  caladeaReguler,
  ramarajaReguler,
} from '../../assets/fonts/FontFamily';
const {width, height} = Dimensions.get('window');
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

export const RegisterScreen = ({}) => {
  const navigation = useNavigation();
  const handleNextPageDaftar = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.backgroundScreen}>
      <StatusBar backgroundColor={'#444444'} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
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
            Buat Akun,
          </Text>
          <Text
            style={{
              fontFamily: caladeaReguler,
              fontSize: height * 0.016,
              marginTop: height * 0.02,
              color: '#6B7280',
            }}>
            Masukkan data yang diperlukan
          </Text>
          <Formik
            initialValues={{
              username: '',
              password: '',
              nama: '',
              nomor_telp: '',
              alamat: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log(values);
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
                        touched.nama && errors.nama ? 'red' : '#D1D5DB',
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
                    <IconPeople />
                  </View>
                  <View style={{width: '85%'}}>
                    <TextInput
                      style={{
                        width: '98%',
                        fontFamily: caladeaReguler,
                        color: '#9CA3AF',
                      }}
                      placeholder="Nama Lengkap"
                      onChangeText={handleChange('nama')}
                      onBlur={handleBlur('nama')}
                      value={values.nama}
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
                        touched.password && errors.password ? 'red' : '#D1D5DB',
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
                <View
                  style={[
                    styles.contentInput,
                    {
                      borderColor:
                        touched.nomor_telp && errors.nomor_telp ? 'red' : '#D1D5DB',
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
                    <IconHp />
                  </View>
                  <View style={{width: '85%'}}>
                    <TextInput
                      style={{
                        width: '98%',
                        fontFamily: caladeaReguler,
                        color: '#9CA3AF',
                      }}
                      placeholder="Nomor Hp"
                      onChangeText={handleChange('nomor_telp')}
                      onBlur={handleBlur('nomor_telp')}
                      value={values.nomor_telp}
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.contentInput,
                    {
                      borderColor:
                        touched.alamat && errors.alamat ? 'red' : '#D1D5DB',
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
                    <IconHouse />
                  </View>
                  <View style={{width: '85%'}}>
                    <TextInput
                      style={{
                        width: '98%',
                        fontFamily: caladeaReguler,
                        color: '#9CA3AF',
                      }}
                      placeholder="Alamat Lengkap"
                      onChangeText={handleChange('alamat')}
                      onBlur={handleBlur('alamat')}
                      value={values.alamat}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.buttonSubmit}>
                  <Text
                    style={{
                      fontFamily: caladeaBold,
                      fontSize: height * 0.018,
                      color: 'white',
                    }}>
                    Daftar
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <View
            style={{
              marginTop: height * 0.02,
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: height * 0.2,
            }}>
            <Text
              style={{
                fontFamily: caladeaReguler,
                fontSize: height * 0.016,
                color: '#6B7280',
                marginRight: 2,
              }}>
              Sudah punya akun?
            </Text>
            <TouchableOpacity onPress={handleNextPageDaftar}>
              <Text
                style={{
                  fontFamily: caladeaBold,
                  fontSize: height * 0.016,
                  color: 'black',
                }}>
                MASUK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    height: '35%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contentDown: {
    flex: 1,
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
