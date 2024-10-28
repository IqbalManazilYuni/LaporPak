import React, {useState} from 'react';
import {
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
import {
  IconHouse,
  IconHp,
  IconLock,
  IconPeople,
  IconUsername,
  LOGO,
} from '../../assets';
import {
  caladeaBold,
  caladeaReguler,
  ramarajaReguler,
} from '../../assets/fonts/FontFamily';
const {width, height} = Dimensions.get('window');
import {Formik} from 'formik';
import * as Yup from 'yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Loading from '../../components/loading/Loading';
import {Dropdown} from 'react-native-element-dropdown';
import useKabupateKota from '../../hook/fetchKabupateKota';
import {PesanError} from '../../components/errot';
import {RootStackParamList} from '../../navigator/AppNavigator';
import Toast from 'react-native-toast-message';
import {useMutation} from '@tanstack/react-query';
import {postRegister} from '../../hook/createMasyarakatHooks';

export const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {KabupatenKotaList, loading5, error5} = useKabupateKota();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const mutation = useMutation(postRegister, {
    onSuccess: async data => {
      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: 'Anda Berhasil Membuat Akun',
      });
      setLoading(false);
      navigation.navigate('Login');
    },
    onError: error => {
      const errorMessage =
        error.response?.data?.message || 'Terjadi kesalahan.';
      Toast.show({type: 'error', text1: 'Login gagal', text2: errorMessage});
      setLoading(false);
    },
  });

  const handleNextPageDaftar = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.backgroundScreen}>
      <StatusBar backgroundColor={'#444444'} />
      {(loading5 || loading) && <Loading />}
      {error5 && <PesanError text={error5} />}

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
              name: '',
              nomor_hp: '',
              addres: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async values => {
              setLoading(true);
              mutation.mutate({
                username: values.username,
                password: values.password,
                name: values.name,
                nomor_hp: values.nomor_hp,
                addres: values.addres,
              });
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
                        touched.name && errors.name ? 'red' : '#D1D5DB',
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
                        fontSize: height * 0.02,
                        color: '#9CA3AF',
                      }}
                      placeholder="Nama Lengkap"
                      onChangeText={handleChange('name')}
                      placeholderTextColor={'#9CA3AF'}
                      onBlur={handleBlur('name')}
                      value={values.name}
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
                        fontSize: height * 0.02,
                        color: '#9CA3AF',
                      }}
                      placeholder="Username"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      placeholderTextColor={'#9CA3AF'}
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
                        fontSize: height * 0.02,
                        color: '#9CA3AF',
                      }}
                      placeholder="Password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={true}
                      placeholderTextColor={'#9CA3AF'}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: '80%',
                    flexDirection: 'row',
                    backgroundColor: '#F9FAFB',
                    height: 45,
                    marginTop: height * 0.025,
                    borderWidth: 1,
                    borderColor:
                      touched.addres && errors.addres ? 'red' : '#D1D5DB',
                    borderRadius: 8,
                  }}>
                  <View
                    style={{
                      width: '15%',
                      height: '100%',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      position: 'absolute',
                      zIndex: 1000,
                      paddingRight: 10,
                    }}>
                    <IconHouse />
                  </View>
                  <View style={{width: '100%'}}>
                    <Dropdown
                      data={KabupatenKotaList.map(item => ({
                        value: item.kabupatenkota,
                        title: item.kabupatenkota,
                      }))}
                      maxHeight={250}
                      searchPlaceholder="Search..."
                      search
                      value={values.addres}
                      inputSearchStyle={styles.oNselectedTextStyle}
                      dropdownPosition="top"
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      onChange={item => {
                        handleChange('addres')(item.value);
                        setModalOpen(false);
                      }}
                      placeholder="Pilih Kota"
                      labelField="title"
                      valueField="value"
                      style={{
                        padding: 10,
                        height: 45,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.contentInput,
                    {
                      borderColor:
                        touched.nomor_hp && errors.nomor_hp ? 'red' : '#D1D5DB',
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
                        fontSize: height * 0.02,
                        color: '#9CA3AF',
                      }}
                      placeholder="Nomor Hp"
                      onChangeText={handleChange('nomor_hp')}
                      onBlur={handleBlur('nomor_hp')}
                      value={values.nomor_hp}
                      placeholderTextColor={'#9CA3AF'}
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
              marginBottom: modalOpen === true ? height * 0.6 : height * 0.2,
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
  username: Yup.string().required('Username wajib diisi'),
  password: Yup.string().required('Password wajib diisi'),
  name: Yup.string().required('Nama wajib diisi'),
  nomor_hp: Yup.string()
    .matches(/^[0-9]+$/, 'Hanya angka')
    .required('Nomor telepon wajib diisi'),
  addres: Yup.string().required('Alamat wajib diisi'),
});
const styles = StyleSheet.create({
  backgroundScreen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  placeholderStyle: {
    fontFamily: caladeaReguler,
    color: '#9CA3AF',
    marginLeft: width * 0.1,
    fontSize: height * 0.02,
  },
  selectedTextStyle: {
    fontFamily: caladeaReguler,
    fontSize: height * 0.02,
    marginLeft: width * 0.1,
    color: '#9CA3AF',
  },
  oNselectedTextStyle: {
    fontFamily: caladeaReguler,
    fontSize: height * 0.02,
    color: '#9CA3AF',
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
