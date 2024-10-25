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
import Pdf from 'react-native-pdf';
import axiosInstance from '../../utils/axiosInterceptors';
import {API_BASE_URL} from '../../utils/server';
import {penggunaStore} from '../../utils/PenggunaUtils';

const {width, height} = Dimensions.get('window');

export const NotifikasiScreen: React.FC = observer(function NotifikasiScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {currentUser, logout} = penggunaStore;
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
    if (sertifikatList.length > 0) {
      const handleSumbit = async () => {
        const dataFilter = sertifikatList.filter(
          item => item.status_notif === 'tersampaikan',
        );
        if (dataFilter.length > 0) {
          dataFilter.forEach(async item => {
            try {
              const response = await axiosInstance.put(
                `${API_BASE_URL}/api/sertifikat`,
                {
                  _id: item._id,
                  status_notif: 'dibaca',
                },
              );
              console.log('Update berhasil untuk:', item._id);
            } catch (error) {
              console.error('Error updating status_notif:', error);
            }
          });
        }
      };
      handleSumbit();
    }
  }, [sertifikatList]);
  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [isFocused, currentUser]);

  const getRelativeTime = (date: string) => {
    const now = moment();
    const createdAt = moment(date);

    const diffMinutes = now.diff(createdAt, 'minutes');

    if (diffMinutes < 1) {
      return 'Baru saja';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} menit`;
    } else if (diffMinutes < 1440) {
      const diffHours = now.diff(createdAt, 'hours');
      return `${diffHours} jam`;
    } else if (diffMinutes < 10080) {
      const diffDays = now.diff(createdAt, 'days');
      return `${diffDays} hari`;
    } else if (diffMinutes < 43800) {
      const diffWeeks = now.diff(createdAt, 'weeks');
      return `${diffWeeks} minggu`;
    } else if (diffMinutes < 525600) {
      const diffMonths = now.diff(createdAt, 'months');
      return `${diffMonths} bulan`;
    } else {
      const diffYears = now.diff(createdAt, 'years');
      return `${diffYears} tahun`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#444444'} translucent={true} />
      <Header
        TxtMiddle="Notifikasi"
        ImgBack={() => <IconLeftBack />}
        onBackPress={() => navigation.goBack()}
      />
      {loading && <Loading />}
      {sertifikatStore.loading && <Loading />}

      <ScrollView
        style={{flex: 1, marginTop: height * 0.02}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData2} />
        }>
        <View style={styles.contentCard}>
          {dataFilter.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.card}>
              <View style={styles.contentDeskripsi}>
                <Text style={styles.fontJudulPengaduan}>
                  Kamu Menerima Sertifikat dari Satpol PP Sumbar
                </Text>
                <Text style={styles.fontNamaPelapor}>
                  Cek pada menu Sertifikat pada Home aplikasi
                </Text>
              </View>
              <View style={styles.contentDeskripsiS}>
                <Text style={styles.fontNamaPelapor}>
                  {getRelativeTime(row.createdAt)}
                </Text>
              </View>
            </View>
          ))}
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
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
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
    width: '85%',
    flexDirection: 'column',
  },
  contentDeskripsiS: {
    width: '15%',
    flexDirection: 'column',
  },
  fontJudulPengaduan: {
    fontFamily: caladeaBold,
    color: '#374151',
    fontSize: height * 0.02,
  },
  fontNamaPelapor: {
    fontFamily: caladeaReguler,
    color: '#707070',
    fontSize: height * 0.019,
  },
});
