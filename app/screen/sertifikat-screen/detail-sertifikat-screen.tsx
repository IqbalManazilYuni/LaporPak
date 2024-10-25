import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/header/Header';
import {
  IconLeftBack,
  IconPeoplePengaduang,
  IconTanggalDetail,
} from '../../assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import Loading from '../../components/loading/Loading';
import {
  caladeaBold,
  caladeaReguler,
  ramarajaReguler,
} from '../../assets/fonts/FontFamily';
import {useFetchSertifikat} from '../../hook/sertifikatHook';
import moment from 'moment';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('window');

export const DetailSertifikatScreen = observer(
  function DetailSertifikatScreen() {
    const route = useRoute();
    const {sertifikatList, loading} = useFetchSertifikat();
    const [data, setData] = useState<any | null>(null);
    const {_id} = route.params.state;

    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
      if (sertifikatList.length > 0) {
        const filteredData = sertifikatList.find(item => item._id === _id);
        setData(filteredData || null);
      }
    }, [sertifikatList, _id]);

    const navigation = useNavigation();
    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

    // Definisi tipe untuk requestExternalWritePermission
    const requestExternalWritePermission = async (): Promise<boolean> => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permission to save file',
            message: 'App needs access to your storage to save files',
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
    };

    // Definisi tipe untuk handleDownload
    const handleDownload = async (url_pdf: string): Promise<void> => {
      try {
        // Cek apakah sudah ada permission untuk menulis ke penyimpanan eksternal (khusus Android)
        if (Platform.OS === 'android') {
          const hasPermission = await requestExternalWritePermission();
          if (!hasPermission) {
            Alert.alert(
              'Permission denied',
              'Cannot save file without permission.',
            );
            return;
          }
        }

        // Tentukan direktori penyimpanan (Download untuk Android, Document untuk iOS)
        const downloadDir =
          Platform.OS === 'ios'
            ? RNFS.DocumentDirectoryPath // iOS: Documents folder
            : RNFS.DownloadDirectoryPath; // Android: Downloads folder

        // Tentukan path tujuan untuk menyimpan file
        const fileName = `sertifikat-${Date.now()}.pdf`; // Misal nama file sertifikat
        const filePath = `${downloadDir}/${fileName}`;

        // Download file dari URL
        const download = RNFS.downloadFile({
          fromUrl: url_pdf, // URL dari PDF
          toFile: filePath, // Path tujuan di perangkat
        });

        const result = await download.promise;

        if (result.statusCode === 200) {
          // Jika berhasil
          Alert.alert('Unduhan berhasil', `File tersimpan di ${filePath}`);
        } else {
          // Jika gagal
          Alert.alert(
            'Unduhan gagal',
            'Terjadi kesalahan saat mengunduh file.',
          );
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Terjadi kesalahan saat mengunduh file.');
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#444444'} translucent={true} />
        <Header
          TxtMiddle="Detail Sertifikat"
          ImgBack={() => <IconLeftBack />}
          onBackPress={() => navigation.goBack()}
        />
        {loading && <Loading />}
        <View style={styles.containerContent}>
          <View>
            {data ? (
              <>
                <TouchableOpacity onPress={toggleModal}>
                  <Image
                    source={require('../../assets/homescreen/foto2.png')}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <View style={styles.contentDeskripsi}>
                  <Text style={styles.fontJudulPengaduan}>
                    {data.nama_sertifikat}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 5,
                      width: '100%',
                    }}>
                    <View style={{width: '3%'}}>
                      <IconPeoplePengaduang />
                    </View>
                    <Text style={styles.fontNamaPelapor}>
                      {data.nama_pelapor}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 5,
                      width: '100%',
                    }}>
                    <View style={{width: '3%'}}>
                      <IconTanggalDetail />
                    </View>
                    <Text style={styles.fontNamaPelapor}>
                      {moment(data.createdAt).format('D MMMM YYYY')}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <Text>Data tidak ditemukan</Text>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <View
            style={{
              height: 'auto',
              width: '80%',
            }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: '100%',
                backgroundColor: '#EBC830',
                borderRadius: 54,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleDownload(data.uri_pdf)}>
              <Text style={{color: 'white', fontFamily: caladeaBold}}>
                Unduh
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={isModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleModal}>
              <Text style={styles.modalCloseText}>Tutup</Text>
            </TouchableOpacity>
            <Image
              source={{uri: data?.uri_thumbnail}}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerContent: {
    flex: 1,
    zIndex: 100,
  },
  content: {
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: height * 0.4,
  },
  contentDeskripsi: {
    marginHorizontal: height * 0.02,
    paddingTop: height * 0.02,
    flexDirection: 'column',
  },
  fontJudulPengaduan: {
    fontFamily: ramarajaReguler,
    color: '#374151',
    fontSize: height * 0.024,
    marginTop: 5,
  },
  fontNamaPelapor: {
    fontFamily: caladeaReguler,
    color: '#707070',
    fontSize: height * 0.018,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '80%',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  modalCloseText: {
    color: 'white',
    fontSize: 18,
  },
});
