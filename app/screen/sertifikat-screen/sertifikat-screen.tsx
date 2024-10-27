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
  IconSeru,
  IconSuccess,
  IconTanggalDetail,
  IconWarning,
} from '../../assets';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  caladeaBold,
  caladeaReguler,
  ramarajaReguler,
} from '../../assets/fonts/FontFamily';
import {observer} from 'mobx-react-lite';
import moment from 'moment';
import 'moment/locale/id';
import Loading from '../../components/loading/Loading';
import {useFetchSertifikat} from '../../hook/sertifikatHook';
import {sertifikatStore} from '../../utils/SertifikatUtils';
import {penggunaStore} from '../../utils/PenggunaUtils';

const {width, height} = Dimensions.get('window');

export const SertifikatScreen: React.FC = observer(function SertifikatScreen() {
  const {currentUser, logout} = penggunaStore;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  moment.locale('id');
  const {sertifikatList, loading} = useFetchSertifikat();

  const data = sertifikatList;
  const [dataFilter, setDataFilter] = useState(data);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    if (currentUser) {
      await sertifikatStore.getDataSertifikat();
      setDataFilter(sertifikatStore.sertifikat);
    }
  };
  const fetchData2 = async () => {
    if (currentUser) {
      setRefreshing(true);
      await sertifikatStore.getDataSertifikat();
      setDataFilter(sertifikatStore.sertifikat);
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
    navigation.navigate('DetailSertifikat', {
      state: {_id: dataPengaduan?._id},
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#444444'} translucent={true} />
      <Header
        TxtMiddle="Sertifikat"
        ImgBack={() => <IconLeftBack />}
        onBackPress={() => navigation.goBack()}
      />
      {loading && <Loading />}
      {sertifikatStore.loading && <Loading />}

      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', width: '85%'}}>
          <View
            style={{
              width: '1%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconSeru />
          </View>
          <View
            style={{
              width: '95%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
            <Text style={{fontFamily: caladeaReguler, color: '#444444'}}>
              Sertifikat akan didapatkan jika kamu sebagai pelapor teraktif.
            </Text>
          </View>
        </View>
      </View>

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
                      source={require('../../assets/homescreen/foto2.png')}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.contentDeskripsi}>
                    <Text style={styles.fontJudulPengaduan}>
                      {row.nama_sertifikat}
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
                        {row.nama_pelapor}
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
                        {moment(row.createdAt).format('D MMMM YYYY')}
                      </Text>
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
                // height: height,
                marginTop:height*0.2,
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
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentCard: {
    flex: 1,
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
    fontSize: height * 0.024,
    marginTop: 5,
  },
  fontNamaPelapor: {
    fontFamily: caladeaReguler,
    color: '#707070',
    fontSize: height * 0.018,
    marginLeft: 10,
  },
});
