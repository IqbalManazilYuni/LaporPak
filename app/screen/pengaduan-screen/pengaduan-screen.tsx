import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/header/Header';
import {
  IconAdd,
  IconEmpty,
  IconLeftBack,
  IconPapan,
  IconPeoplePengaduang,
  IconSeach,
  IconSuccess,
  IconWarning,
} from '../../assets';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import SearchComponent from '../../components/search/Search';
import {caladeaBold, caladeaReguler, ramarajaReguler} from '../../assets/fonts/FontFamily';
import {useFetchDetailPengaduan} from '../../hook/tambahPengaduan';
import {observer} from 'mobx-react-lite';
import Loading from '../../components/loading/Loading';
import {detailPengaduanStore} from '../../utils/DetailPengaduanUtils';
import {penggunaStore} from '../../utils/PenggunaUtils';

const {width, height} = Dimensions.get('window');

export const PengaduanScreen: React.FC = observer(function PengaduanScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {currentUser} = penggunaStore;
  const {detailPengaduanList, loading3} = useFetchDetailPengaduan();
  const data = detailPengaduanList;
  const [dataFilter, setDataFilter] = useState(data);
  const [refreshing, setRefreshing] = useState(false);

  const handleTambahPelaporan = () => {
    navigation.navigate('TambahPengaduan');
  };

  const fetchData = async () => {
    if (currentUser) {
      await detailPengaduanStore.getDataDetailPengaduan();
      setDataFilter(detailPengaduanStore.detailpengaduan);
    }
  };
  const fetchData2 = async () => {
    if (currentUser) {
      setRefreshing(true);
      await detailPengaduanStore.getDataDetailPengaduan();
      setDataFilter(detailPengaduanStore.detailpengaduan);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [isFocused, currentUser]);

  const handleDetail = (id: any) => {
    const dataPengaduan = dataFilter.find(item => item._id === id);
    navigation.navigate('DetailPengaduan', {
      state: {_id: dataPengaduan?._id},
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#444444'} translucent={true} />
      <Header
        TxtMiddle="Pengaduan"
        ImgBack={() => <IconLeftBack />}
        onBackPress={() => navigation.goBack()}
      />
      {loading3 && <Loading />}
      {detailPengaduanStore.loading && <Loading />}

      <SearchComponent
        data={data}
        setFiltered={setDataFilter}
        filterKey="judul"
      />
      <ScrollView
        style={{flex: 1, marginTop: height * 0.02}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData2} />
        }>
        <View style={styles.contentCard}>
          {dataFilter.length > 0 ? (
            <>
              {dataFilter.map((row, rowIndex) => (
                <TouchableOpacity
                  key={rowIndex}
                  style={styles.card}
                  onPress={() => handleDetail(row._id)}>
                  <View style={styles.contentImage}>
                    <Image
                      source={{uri: row.uri_foto}}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.contentDeskripsi}>
                    <Text style={styles.fontJudulPengaduan}>{row.judul}</Text>
                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                      <IconPeoplePengaduang />
                      <Text style={styles.fontNamaPelapor}>
                        {row.nama_pelapor}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                      <IconPapan />
                      <Text style={styles.fontNamaPelapor}>
                        {row.jenis_pengaduan}
                      </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <View
                        style={{
                          width: '80%',
                          height: 20,
                          backgroundColor:
                            row.status === 'menunggu'
                              ? '#FF0000'
                              : row.status === 'ditindaklanjuti'
                                ? '#A0522D'
                                : '#2E7528',
                          opacity: 0.53,
                          borderRadius: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          marginTop: 5,
                        }}>
                        {row.status === 'menunggu' ? (
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
                        ) : row.status === 'ditindaklanjuti' ? (
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
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: height * 0.2,
                flexDirection: 'column',
              }}>
              <IconEmpty />
              <Text
                style={{
                  fontFamily: caladeaBold,
                  color: 'black',
                  fontSize: height * 0.02,
                }}>
                Data Tidak Ada
              </Text>
              <Text
                style={{
                  fontFamily: caladeaReguler,
                  color: 'black',
                  fontSize: height * 0.017,
                  marginTop: 2,
                }}>
                Tidak Ada Data yang Ditampilkan
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.contentAdd}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => handleTambahPelaporan()}>
          <IconAdd preserveAspectRatio="none" height={'30%'} width={'30%'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentCard: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    borderRadius: 16,
    flexDirection: 'column',
    elevation: 5,
    alignItems: 'center',
    marginVertical: 10,
    height: height * 0.32,
    backgroundColor: 'white',
  },
  contentAdd: {
    position: 'absolute',
    bottom: height * 0.02,
    right: height * 0.02,
    zIndex: 10,
    height: height * 0.1,
    width: height * 0.1,
  },
  buttonAdd: {
    height: height * 0.1,
    width: height * 0.1,
    borderRadius: (height * 0.1) / 2,
    backgroundColor: '#EBC730',
    alignItems: 'center',
    elevation: 5,
    justifyContent: 'center',
  },
  contentImage: {
    height: '50%',
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentDeskripsi: {
    flex: 1,
    width: '90%',
    flexDirection: 'column',
  },
  fontJudulPengaduan: {
    fontFamily: ramarajaReguler,
    color: '#374151',
    fontSize: height * 0.026,
    marginTop: 5,
  },
  fontNamaPelapor: {
    fontFamily: caladeaReguler,
    color: '#707070',
    fontSize: height * 0.018,
    marginLeft: 10,
  },
});
