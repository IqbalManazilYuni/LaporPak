import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/header/Header';
import {
  IconKategoriDetail,
  IconLeftBack,
  IconNomorDetail,
  IconOrangDetail,
  IconSuccess,
  IconTanggalDetail,
  IconWarning,
} from '../../assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {caladeaReguler, ramarajaReguler} from '../../assets/fonts/FontFamily';

const {height} = Dimensions.get('window');

export const DetailPengaduanScreen = observer(function DetailPengaduanScreen() {
  const route = useRoute();
  const {dataPengaduan} = route.params as {dataPengaduan: any};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const openGoogleMaps = () => {
    if (dataPengaduan?.lokasi) {
      try {
        const {latitude, longitude} = JSON.parse(dataPengaduan.lokasi);
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
      } catch (error) {
        console.error('Invalid lokasi format:', error);
      }
    } else {
      console.error('No lokasi data found');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#444444'} translucent={true} />
      <Header
        TxtMiddle="Detail Pengaduan"
        ImgBack={() => <IconLeftBack />}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.containerContent}
        contentContainerStyle={{paddingBottom: height * 0.05}}
        showsVerticalScrollIndicator={false}>
        <View>
          {dataPengaduan ? (
            <>
              <TouchableOpacity onPress={toggleModal}>
                <Image
                  source={{uri: dataPengaduan.uri_foto}}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <View style={styles.contentDeskripsi}>
                <Text style={styles.fontTebal}>{dataPengaduan.judul}</Text>
                <Text style={[styles.fontKecil, {marginVertical: 0}]}>
                  {dataPengaduan.deskripsi}
                </Text>
                <Text style={styles.fontTebal}>Detail Laporan</Text>
                <Text style={styles.fontKecil}>Nomor Laporan</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconNomorDetail />
                  <Text style={[styles.fontKecil, {marginLeft: 5}]}>
                    {dataPengaduan.index}
                  </Text>
                </View>
                <Text style={styles.fontKecil}>Tanggal Masuk</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconTanggalDetail />
                  <Text style={[styles.fontKecil, {marginLeft: 5}]}>
                    {dataPengaduan.tanggal}
                  </Text>
                </View>
                <Text style={styles.fontKecil}>Kategori</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconKategoriDetail />
                  <Text style={[styles.fontKecil, {marginLeft: 5}]}>
                    {dataPengaduan.jenis_pengaduan}
                  </Text>
                </View>
                <Text style={styles.fontKecil}>Nama Pelapor</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconOrangDetail />
                  <Text style={[styles.fontKecil, {marginLeft: 5}]}>
                    {dataPengaduan.nama_pelapor}
                  </Text>
                </View>
                <Text style={styles.fontKecil}>Lokasi yang Dilaporkan</Text>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={openGoogleMaps}
                    style={{
                      width: '80%',
                      height: 30,
                      backgroundColor: 'green',
                      opacity: 0.5,
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text style={styles.fontKecil}>Buka di Google Maps</Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.fontTebal, {marginTop: height * 0.02}]}>
                  Status Laporan
                </Text>
                <Text style={styles.fontKecil}>Informasi</Text>
                <Text
                  style={
                    styles.fontKecil
                  }>{`Laporan Diterima Oleh : ${dataPengaduan.petugas}`}</Text>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <View
                    style={{
                      width: '80%',
                      height: 30,
                      backgroundColor:
                        dataPengaduan.status === 'menunggu'
                          ? '#FF0000'
                          : dataPengaduan.status === 'ditindaklanjuti'
                            ? '#A0522D'
                            : '#2E7528',
                      opacity: 0.53,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      marginVertical: height * 0.02,
                    }}>
                    {dataPengaduan.status === 'menunggu' ? (
                      <>
                        <IconWarning />
                        <Text
                          style={{
                            fontFamily: caladeaReguler,
                            color: '#A91010',
                          }}>
                          Menunggu
                        </Text>
                      </>
                    ) : dataPengaduan.status === 'ditindaklanjuti' ? (
                      <>
                        <Text
                          style={{
                            fontFamily: caladeaReguler,
                            color: '#A0522D',
                          }}>
                          Ditindaklanjuti
                        </Text>
                      </>
                    ) : (
                      <>
                        <IconSuccess />
                        <Text
                          style={{
                            fontFamily: caladeaReguler,
                            color: '#2E7528',
                          }}>
                          Selesai
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
            </>
          ) : (
            <Text>Data tidak ditemukan</Text>
          )}
        </View>
      </ScrollView>

      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={toggleModal}>
            <Text style={styles.modalCloseText}>Tutup</Text>
          </TouchableOpacity>
          <Image
            source={{uri: dataPengaduan?.uri_foto}}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
});

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
    height: height * 0.3,
  },
  contentDeskripsi: {
    marginHorizontal: height * 0.02,
    paddingTop: height * 0.02,
    flexDirection: 'column',
  },
  fontTebal: {
    fontFamily: ramarajaReguler,
    fontSize: height * 0.032,
    color: 'black',
  },
  fontKecil: {
    fontFamily: caladeaReguler,
    fontSize: height * 0.023,
    marginVertical: 5,
    color: '#444444',
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
