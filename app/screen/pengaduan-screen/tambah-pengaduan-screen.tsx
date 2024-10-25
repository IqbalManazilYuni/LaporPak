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
import {penggunaStore} from '../../utils/PenggunaUtils';
import {useFetchJenisPengaduan} from '../../hook/jenisPengaduanHook';
import {observer} from 'mobx-react-lite';
import {useFetchKabupatenKota} from '../../hook/kabupatenKotaHook';
import Loading from '../../components/loading/Loading';
import {
  requestCameraPermission,
  requestLocationPermission,
} from '../../utils/requestpermisions';
import {useCreateReport} from '../../hook/tambahPengaduan';
import {detailPengaduanStore} from '../../utils/DetailPengaduanUtils';

const {width, height} = Dimensions.get('window');
interface Location {
  latitude: number;
  longitude: number;
}

export const TambahPengaduanScreen: React.FC = observer(
  function TambahPengaduanScreen() {
    const navigation = useNavigation();
    const {jenisPengaduanList, loading} = useFetchJenisPengaduan();
    const {kabupatenKotaList, loading1} = useFetchKabupatenKota();
    const {createReport, loading2} = useCreateReport();
    const {currentUser} = penggunaStore;
    const [location, setLocation] = useState<Location | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    moment.locale('id');
    const formattedDate = moment().format('dddd, DD MMMM YYYY');

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
        {loading && <Loading />}
        {loading1 && <Loading />}

        <ScrollView
          style={styles.contentForm}
          showsVerticalScrollIndicator={false}>
          <View style={{paddingTop: 15}}>
            <Text style={styles.fontTitle}>Nama Pelapor</Text>
            <Text style={styles.fontSubtitle}>{currentUser?.name}</Text>
            <Text style={styles.fontTitle}>Tanggal Pelaporan</Text>
            <Text style={styles.fontSubtitle}>{formattedDate}</Text>
            <Text style={styles.fontTitle}>Lokasi Pelaporan</Text>
            <Text style={styles.fontSubtitle}>
              {location
                ? `${location.latitude}, ${location.longitude}`
                : 'Fetching location...'}
            </Text>
            <Formik
              initialValues={{
                nama_daerah: '',
                jenis_pengaduan: '',
                judul: '',
                deskripsi: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async values => {
                const formData = new FormData();
                formData.append('tanggal', formattedDate);
                formData.append('pelapor', currentUser?.name);
                formData.append('lokasi', JSON.stringify(location));
                formData.append('kabupatenkota', values.nama_daerah);
                formData.append('jenispengaduan', values.jenis_pengaduan);
                formData.append('judul_pengaduan', values.judul);
                formData.append('deskripsi', values.deskripsi);
                if (imageUri) {
                  formData.append('photo', {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: 'report-photo.jpg',
                  });
                }

                console.log("ayam",formData);

                await createReport(formData);
                if (loading2 === false) {
                  detailPengaduanStore.getDataDetailPengaduan();
                  navigation.navigate('Pengaduan');
                }
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
                  <Text style={styles.fontTitle}>Kota</Text>
                  <Dropdown
                    data={kabupatenKotaList.map(item => ({
                      value: item.kabupatenkota,
                      title: item.kabupatenkota,
                    }))}
                    maxHeight={300}
                    searchPlaceholder="Search..."
                    search
                    value={values.nama_daerah}
                    inputSearchStyle={styles.selectedTextStyle}
                    dropdownPosition="auto"
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
                  {touched.nama_daerah && errors.nama_daerah && (
                    <Text style={{color: 'red', fontSize: 12}}>
                      {errors.nama_daerah}
                    </Text>
                  )}
                  <Text style={styles.fontTitle}>Jenis Pengaduan</Text>
                  <Dropdown
                    data={jenisPengaduanList.map(item => ({
                      value: item.jenisPengaduan,
                      title: item.jenisPengaduan,
                    }))}
                    maxHeight={300}
                    value={values.jenis_pengaduan}
                    searchPlaceholder="Search..."
                    search
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
                      height: 60,
                      backgroundColor: '#F9FAFB',
                    }}
                  />
                  {touched.jenis_pengaduan && errors.jenis_pengaduan && (
                    <Text style={{color: 'red', fontSize: 12}}>
                      {errors.jenis_pengaduan}
                    </Text>
                  )}

                  <Text style={styles.fontTitle}>Judul</Text>
                  <TextInput
                    style={styles.fontTextInput}
                    onChangeText={handleChange('judul')}
                    onBlur={handleBlur('judul')}
                    value={values.judul}
                    placeholder="Masukkan Judul..."
                    placeholderTextColor={'#9CA3AF'}
                  />
                  {touched.judul && errors.judul && (
                    <Text style={{color: 'red', fontSize: 12}}>
                      {errors.judul}
                    </Text>
                  )}
                  <Text style={styles.fontTitle}>Deskripsi</Text>
                  <TextInput
                    style={styles.fontTextDeskripsi}
                    placeholder="Masukkan Deskripsi..."
                    onChangeText={handleChange('deskripsi')}
                    onBlur={handleBlur('deskripsi')}
                    value={values.deskripsi}
                    placeholderTextColor={'#9CA3AF'}
                    multiline
                  />
                  {touched.deskripsi && errors.deskripsi && (
                    <Text style={{color: 'red', fontSize: 12}}>
                      {errors.deskripsi}
                    </Text>
                  )}
                  <Text style={styles.fontTitle}>Foto</Text>
                  <View style={{width: '100%', marginVertical: 5}}>
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
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{
                        width: '90%',
                        backgroundColor: !imageUri ? '#FFEB97' : '#EBC830',
                        height: height * 0.05,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 54,
                        marginVertical: 15,
                      }}
                      onPress={() => handleSubmit()}
                      disabled={!imageUri ? true : false}>
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
  },
);

const validationSchema = Yup.object().shape({
  nama_daerah: Yup.string().required('Kota wajib dipilih!'),
  jenis_pengaduan: Yup.string().required('Jenis pengaduan wajib dipilih!'),
  judul: Yup.string().required('Judul wajib diisi!'),
  deskripsi: Yup.string().required('Deskripsi wajib diisi!'),
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
  fontTitle: {
    fontFamily: caladeaReguler,
    fontSize: height * 0.018,
    color: '#444444',
    marginVertical: 5,
  },
  fontSubtitle: {
    fontFamily: caladeaReguler,
    fontSize: height * 0.02,
    color: 'black',
    marginVertical: 5,
  },
  fontTextInput: {
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
  },
  fontTextDeskripsi: {
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
  },
});
