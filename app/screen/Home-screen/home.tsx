import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Button,
  BackHandler,
} from 'react-native';
import {
  BgAtasLingkaran,
  BgBawahLingkaran,
  IconKeluar,
  IconLogoHome,
  IconNotifBelum,
  IconNotifSudah,
  IconPengaduan,
  IconPolice,
  IconProfile,
  IconSertifikat,
  IconTentang,
} from '../../assets';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  caladeaBold,
  caladeaReguler,
  ramarajaReguler,
} from '../../assets/fonts/FontFamily';
import Modal from 'react-native-modal';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {penggunaStore} from '../../utils/PenggunaUtils';
import ModalTentang from '../../components/modal/modal-tentang/ModalTentang';
import {useFetchDetailPengaduan} from '../../hook/tambahPengaduan';
import Loading from '../../components/loading/Loading';
import {useFetchSertifikat} from '../../hook/sertifikatHook';
import {observer} from 'mobx-react-lite';
import {sertifikatStore} from '../../utils/SertifikatUtils';
import {detailPengaduanStore} from '../../utils/DetailPengaduanUtils';
import Toast from 'react-native-toast-message';

const {width, height} = Dimensions.get('window');

const menu = [
  {
    title: 'Pengaduan',
    link: 'Pengaduan',
    icon: () => <IconPengaduan />,
  },
  {
    title: 'Profile',
    link: 'pesertascreen',
    icon: () => <IconProfile />,
  },
  {
    title: 'Tentang',
    icon: () => <IconTentang />,
  },
  {
    title: 'Sertifikat',
    link: 'Sertifikat',
    icon: () => <IconSertifikat />,
  },
  {
    title: 'Keluar',
    link: 'ujianscreen',
    icon: () => <IconKeluar />,
  },
];

const images = [
  {id: '1', src: require('../../assets/homescreen/foto.png')},
  {id: '2', src: require('../../assets/homescreen/fotoo.jpeg')},
  {id: '3', src: require('../../assets/homescreen/foto.png')},
];

export const HomeScreen: React.FC = observer(function HomeScreen() {
  const {currentUser, logout} = penggunaStore;
  const isFocused = useIsFocused();
  const {detailPengaduanList, loading3} = useFetchDetailPengaduan();
  const {sertifikatList, loading} = useFetchSertifikat();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [notif, setNotif] = useState(false);

  useEffect(() => {
    if (sertifikatList.length > 0) {
      const data = sertifikatList.find(
        item => item.status_notif === 'tersampaikan',
      );
      if (data) {
        setNotif(true);
      } else {
        setNotif(false);
      }
    }
  }, [sertifikatList]);

  const handleNotifPage = () => {
    navigation.navigate('Notifikasi');
  };

  const fetchData = async () => {
    if (currentUser) {
      await sertifikatStore.getDataSertifikat();
      await detailPengaduanStore.getDataDetailPengaduan();
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [isFocused, currentUser]);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

  const navigation = useNavigation();
  const handleOnPress = async (title: string) => {
    if (title === 'Tentang') {
      setModalVisible(!isModalVisible);
    } else if (title === 'Pengaduan') {
      navigation.navigate('Pengaduan');
    } else if (title === 'Keluar') {
      await penggunaStore.logout();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } else if (title === 'Sertifikat') {
      navigation.navigate('Sertifikat');
    }
  };

  const _renderItem = ({item}: {item: {src: any}}) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={item.src} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.backgroundScreen}>
      {loading3 && <Loading />}
      <View style={styles.contentHeader}>
        <View style={styles.headerRow}>
          <View style={styles.logoContainer}>
            <IconLogoHome />
          </View>
          <View style={styles.profileContainer}>
            <View style={{marginHorizontal: 10}}>
              <TouchableOpacity onPress={() => handleNotifPage()}>
                {notif === false ? <IconNotifSudah /> : <IconNotifBelum />}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.profilePicture} />
          </View>
        </View>
      </View>
      <View style={styles.contentImage}>
        <View style={styles.carouselContainer}>
          <Carousel
            data={images}
            renderItem={_renderItem}
            sliderWidth={width}
            itemWidth={width}
            layout={'default'}
            loop={true}
            autoplayInterval={100000}
            autoplay={true}
            onSnapToItem={index => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={images.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.activeDotStyle}
            inactiveDotStyle={styles.inactiveDotStyle}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.8}
          />
        </View>

        <View style={styles.reportContainer}>
          <View style={styles.reportCard}>
            <View style={styles.bgAtasContainer}>
              <BgAtasLingkaran preserveAspectRatio="none" />
              <View style={styles.iconPoliceContainer}>
                <IconPolice />
              </View>
            </View>
            <View style={styles.reportTextContainer}>
              <Text style={styles.reportTitle}>Lapor Pak Sumbar</Text>
              <Text
                style={
                  styles.totalReportsText
                }>{`Total Pengaduan : ${detailPengaduanList.length}`}</Text>
            </View>
            <View style={styles.bgBawahContainer}>
              <BgBawahLingkaran preserveAspectRatio="none" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.contentMenu}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Kategori</Text>
          <View style={styles.menuRow}>
            {menu.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.menuItemContainer}>
                <TouchableOpacity
                  style={styles.menuItemButton}
                  onPress={() => handleOnPress(row.title)}>
                  <row.icon />
                </TouchableOpacity>
                <Text style={styles.menuItemText}>{row.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <ModalTentang
        isOpen={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  backgroundScreen: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentHeader: {
    height: '8%',
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  logoContainer: {
    width: '50%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  profileContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
  profilePicture: {
    width: height * 0.05,
    height: height * 0.05,
    borderRadius: (height * 0.05) / 2,
    backgroundColor: 'white',
    elevation: 5,
  },
  contentImage: {
    height: '44%',
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  carouselContainer: {
    height: '65%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -height * 0.02,
    left: 0,
    right: 0,
  },
  activeDotStyle: {
    width: 40,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#444444',
  },
  inactiveDotStyle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'black',
  },
  reportContainer: {
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 10,
  },
  reportCard: {
    width: '100%',
    backgroundColor: '#444444',
    borderRadius: 16,
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bgAtasContainer: {
    width: '30%',
    justifyContent: 'flex-start',
  },
  iconPoliceContainer: {
    position: 'absolute',
    top: '10%',
    left: '10%',
  },
  reportTextContainer: {
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportTitle: {
    fontFamily: ramarajaReguler,
    color: 'white',
    fontSize: height * 0.025,
  },
  totalReportsText: {
    fontFamily: ramarajaReguler,
    color: '#EBC730',
    fontSize: height * 0.025,
  },
  bgBawahContainer: {
    width: '30%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  contentMenu: {
    height: '48%',
    padding: 16,
  },
  menuContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
  },
  menuTitle: {
    fontFamily: ramarajaReguler,
    fontSize: height * 0.026,
    color: 'black',
  },
  menuRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemButton: {
    height: height * 0.1,
    width: height * 0.1,
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  menuItemText: {
    fontFamily: ramarajaReguler,
    color: 'black',
    fontSize: height * 0.024,
  },
});

export default HomeScreen;
