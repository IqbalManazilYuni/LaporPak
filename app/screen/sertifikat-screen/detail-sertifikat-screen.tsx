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
import {
  caladeaBold,
  caladeaReguler,
  ramarajaReguler,
} from '../../assets/fonts/FontFamily';
import moment from 'moment';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('window');

export const DetailSertifikatScreen = () => {
  const route = useRoute();
  const [data, setData] = useState<any | null>(null);
  const {dataPengaduan} = route.params as {dataPengaduan: any};

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setData(dataPengaduan);
  }, [dataPengaduan]);

  const navigation = useNavigation();
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
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
  const handleDownload = async (url_pdf: string): Promise<void> => {
    try {
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
      const downloadDir =
        Platform.OS === 'ios'
          ? RNFS.DocumentDirectoryPath
          : RNFS.DownloadDirectoryPath;

      const fileName = `sertifikat-${Date.now()}.pdf`;
      const filePath = `${downloadDir}/${fileName}`;
      const download = RNFS.downloadFile({
        fromUrl: url_pdf,
        toFile: filePath,
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        Alert.alert('Unduhan berhasil', `File tersimpan di ${filePath}`);
      } else {
        Alert.alert('Unduhan gagal', 'Terjadi kesalahan saat mengunduh file.');
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
            <Text style={{color: 'white', fontFamily: caladeaBold}}>Unduh</Text>
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
            source={require('../../assets/homescreen/foto2.png')}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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
