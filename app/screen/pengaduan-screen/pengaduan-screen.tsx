import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/header/Header';
import {
  IconAdd,
  IconLeftBack,
  IconPapan,
  IconPeoplePengaduang,
  IconSeach,
  IconSuccess,
  IconWarning,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import SearchComponent from '../../components/search/Search';
import {caladeaReguler, ramarajaReguler} from '../../assets/fonts/FontFamily';

const dataImage = [
  {
    id: 1,
    nama_pengaduan: 'Buang Sampah Sembarangan',
    nama_pelapor: 'Muhammad Hartono',
    jenis_pelaporan: 'Kawasan Tertib',
    source: require('../../assets/homescreen/foto.png'),
    status: 'menunggu',
  },
  {
    id: 2,
    nama_pengaduan: 'Buang Sampah Sembarangan',
    nama_pelapor: 'Muhammad Hartono',
    jenis_pelaporan: 'Kawasan Tertib',
    source: require('../../assets/homescreen/foto.png'),
    status: 'menunggu',
  },
  {
    id: 3,
    nama_pengaduan: 'Buang Sampah Sembarangan',
    nama_pelapor: 'Muhammad Hartono',
    jenis_pelaporan: 'Kawasan Tertib',
    source: require('../../assets/homescreen/foto.png'),
    status: 'sukses',
  },
];

const {width, height} = Dimensions.get('window');
export const PengaduanScreen: React.FC = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const handleTambahPelaporan = () => {
    navigation.navigate('TambahPengaduan');
  };

  const handleDetail = (id: any) => {
    const dataPengaduan = dataImage.find(item => item.id === id);
    navigation.navigate('DetailPengaduan');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#444444'} translucent={true} />
      <Header
        TxtMiddle="Pengaduan"
        ImgBack={() => <IconLeftBack />}
        onBackPress={() => navigation.goBack()}
      />
      <SearchComponent
        data={data}
        setFiltered={setDataFilter}
        filterKey="nama_pengaduan"
      />
      <ScrollView
        style={{flex: 1, marginTop: height * 0.02}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentCard}>
          {dataImage.map((row, rowIndex) => (
            <TouchableOpacity
              key={rowIndex}
              style={styles.card}
              onPress={() => handleDetail(row.id)}>
              <View style={styles.contentImage}>
                <Image
                  source={row.source}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.contentDeskripsi}>
                <Text style={styles.fontJudulPengaduan}>
                  {row.nama_pengaduan}
                </Text>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <IconPeoplePengaduang />
                  <Text style={styles.fontNamaPelapor}>{row.nama_pelapor}</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                  <IconPapan />
                  <Text style={styles.fontNamaPelapor}>
                    {row.jenis_pelaporan}
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <View
                    style={{
                      width: '80%',
                      height: 20,
                      backgroundColor:
                        row.status === 'menunggu' ? '#FF0000' : '#2E7528',
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
};

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
