import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/header/Header';
import {IconLeftBack} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/id';
import {caladeaBold, caladeaReguler} from '../../assets/fonts/FontFamily';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dropdown} from 'react-native-element-dropdown';
import Geolocation from 'react-native-geolocation-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');

const data = [
  {value: 'Kota Padang', title: 'Kota Padang'},
  {value: 'Kota Bukittinggi', title: 'Kota Bukittinggi'},
  {value: 'Kota Padang Panjang', title: 'Kota Padang Panjang'},
  {value: 'Kota Payakumbuh', title: 'Kota Payakumbuh'},
];

const dataPengaduan = [
  {value: 'Kota Padang', title: 'Kota Padang'},
  {value: 'Kota Bukittinggi', title: 'Kota Bukittinggi'},
  {value: 'Kota Padang Panjang', title: 'Kota Padang Panjang'},
  {value: 'Kota Payakumbuh', title: 'Kota Payakumbuh'},
];

interface Location {
  latitude: number;
  longitude: number;
}

export const TambahPengaduanScreen: React.FC = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Location | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  moment.locale('id');
  const formattedDate = moment().format('dddd, DD MMMM YYYY');
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);

  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'We need access to your Camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        Alert.alert(`Error ${error.code}`, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      let options = {
        mediaType: 'photo',
        cameraType: 'back',
      };

      launchCamera(options, response => {
        if (response.didCancel) {
          Alert.alert('User cancelled image picker');
        } else if (response.errorMessage) {
          Alert.alert('Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setImageUri(uri || null);
        }
      });
    }
  };

  useEffect(() => {
    const initLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        getLocation();
      }
    };
    initLocation();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        TxtMiddle="Tambah Pengaduan"
        ImgBack={() => <IconLeftBack />}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.contentForm}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingTop: 15}}>
          <Text
            style={{
              fontFamily: caladeaReguler,
              fontSize: height * 0.018,
              color: '#444444',
              marginVertical: 5,
            }}>
            Nama Pelapor
          </Text>
          <Text
            style={{
              fontFamily: caladeaReguler,
              fontSize: height * 0.02,
              color: 'black',
              marginVertical: 5,
            }}>
            Budi Hartono
          </Text>
          <Text
            style={{
              fontFamily: caladeaReguler,
              fontSize: height * 0.018,
              color: '#444444',
              marginVertical: 5,
            }}>
            Tanggal Pelaporan
          </Text>
          <Text
            style={{
              fontFamily: caladeaReguler,
              fontSize: height * 0.02,
              color: 'black',
              marginVertical: 5,
            }}>
            {formattedDate}
          </Text>
          <Text
            style={{
              fontFamily: caladeaReguler,
              fontSize: height * 0.018,
              color: '#444444',
              marginVertical: 5,
            }}>
            Lokasi Pelaporan
          </Text>
          <Text
            style={{
              fontFamily: caladeaReguler,
              fontSize: height * 0.02,
              color: 'black',
              marginVertical: 5,
            }}>
            {location
              ? `${location.latitude}, ${location.longitude}`
              : 'Fetching location...'}
          </Text>
          <Formik
            initialValues={{
              username: '',
              nama_daerah: '',
              nama: '',
              jenis_pengaduan: '',
              alamat: '',
              judul: '',
              deskripsi: '',
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
                <Text
                  style={{
                    fontFamily: caladeaReguler,
                    color: '#444444',
                    fontSize: height * 0.018,
                    marginVertical: 5,
                  }}>
                  Kota
                </Text>
                <Dropdown
                  data={data}
                  maxHeight={300}
                  value={values.nama_daerah}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  onChange={item => {
                    handleChange('nama_daerah')(item.value);
                  }}
                  placeholder="Pilih Kota"
                  labelField="title"
                  valueField="value"
                  style={{
                    borderWidth: 1,
                    borderColor:
                      touched.nama_daerah && errors.nama_daerah
                        ? 'red'
                        : '#D1D5DB',
                    borderRadius: 8,
                    padding: 10,
                    marginVertical: 5,
                    backgroundColor: '#F9FAFB',
                    height: 50,
                  }}
                />
                <Text
                  style={{
                    fontFamily: caladeaReguler,
                    color: '#444444',
                    fontSize: height * 0.018,
                    marginVertical: 5,
                  }}>
                  Jenis Pengaduan
                </Text>
                <Dropdown
                  data={dataPengaduan}
                  maxHeight={300}
                  value={values.jenis_pengaduan}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  onChange={item => {
                    handleChange('jenis_pengaduan')(item.value);
                  }}
                  placeholder="Pilih Jenis Pengaduan"
                  labelField="title"
                  valueField="value"
                  style={{
                    borderWidth: 1,
                    borderColor:
                      touched.jenis_pengaduan && errors.jenis_pengaduan
                        ? 'red'
                        : '#D1D5DB',
                    borderRadius: 8,
                    padding: 10,
                    marginVertical: 5,
                    height: 50,
                    backgroundColor: '#F9FAFB',
                  }}
                />
                <Text
                  style={{
                    fontFamily: caladeaReguler,
                    color: '#444444',
                    fontSize: height * 0.018,
                    marginVertical: 5,
                  }}>
                  Judul
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#F9FAFB',
                    padding: 10,
                    borderRadius: 8,
                    marginVertical: 5,
                    borderWidth: 1,
                    height: 50,
                    borderColor: '#D1D5DB',
                    fontFamily: caladeaReguler,
                    color: '#9CA3AF',
                    fontSize: height * 0.02,
                  }}
                  placeholder="Masukkan Judul..."
                  placeholderTextColor={'#9CA3AF'}
                />
                <Text
                  style={{
                    fontFamily: caladeaReguler,
                    color: '#444444',
                    fontSize: height * 0.018,
                    marginVertical: 5,
                  }}>
                  Deskripsi
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#F9FAFB',
                    padding: 10,
                    borderRadius: 8,
                    marginVertical: 5,
                    borderWidth: 1,
                    height: 100,
                    borderColor: '#D1D5DB',
                    fontFamily: caladeaReguler,
                    color: '#9CA3AF',
                    fontSize: height * 0.02,
                    textAlignVertical: 'top',
                  }}
                  placeholder="Masukkan Deskripsi..."
                  placeholderTextColor={'#9CA3AF'}
                  multiline
                />
                <Text
                  style={{
                    fontFamily: caladeaReguler,
                    color: '#444444',
                    fontSize: height * 0.018,
                    marginVertical: 5,
                  }}>
                  Foto
                </Text>
                <View style={{width: '100%', marginVertical:5}}>
                  {imageUri && (
                    <Image
                      source={{uri: imageUri}}
                      style={{width: 200, height: 200}}
                    />
                  )}
                </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      width: '90%',
                      backgroundColor: '#EBC830',
                      height: height * 0.05,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 54,
                      marginVertical: 5,
                    }}
                    onPress={() => openCamera()}>
                    <Text
                      style={{
                        fontFamily: caladeaBold,
                        color: 'white',
                        fontSize: height * 0.02,
                      }}>
                      Ambil Foto
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <Button title="Open Camera" onPress={openCamera} />
                <Button
                  title="Open Gallery"
                  onPress={openGallery}
                /> */}

                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      width: '90%',
                      backgroundColor: '#EBC830',
                      height: height * 0.05,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 54,
                      marginVertical:15
                    }}
                    onPress={() => handleSubmit()}>
                    <Text
                      style={{
                        fontFamily: caladeaBold,
                        color: 'white',
                        fontSize: height * 0.02,
                      }}>
                      Simpan
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username harus lebih dari 3 karakter!')
    .required('Username wajib diisi'),
  nama_daerah: Yup.string().required('Kota wajib dipilih!'),
  password: Yup.string()
    .min(6, 'Password harus lebih dari 6 karakter!')
    .required('Password wajib diisi'),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  contentForm: {
    width: '90%',
    flexDirection: 'column',
  },
  placeholderStyle: {
    fontFamily: caladeaReguler,
    color: '#9CA3AF',
  },
  selectedTextStyle: {
    fontFamily: caladeaReguler,
    color: '#9CA3AF',
  },
});
