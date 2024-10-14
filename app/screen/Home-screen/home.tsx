import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  BgAtasLingkaran,
  BgBawahLingkaran,
  IconKeluar,
  IconLogoHome,
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
import { useNavigation } from '@react-navigation/native';

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
    link: 'infolaborscreen',
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
  {id: '2', src: require('../../assets/homescreen/foto.png')},
  {id: '3', src: require('../../assets/homescreen/foto.png')},
];

export const HomeScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()
  const handleOnPress = (title: string) => {
    if (title === 'Tentang') {
      setModalVisible(!isModalVisible);
    } else if(title ==="Pengaduan"){
      navigation.navigate("Pengaduan")
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
      <View style={styles.contentHeader}>
        <View style={styles.headerRow}>
          <View style={styles.logoContainer}>
            <IconLogoHome />
          </View>
          <View style={styles.profileContainer}>
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
              <Text style={styles.totalReportsText}>{`Total Pengaduan :`}</Text>
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
      <Modal isVisible={isModalVisible} animationIn={"bounceIn"} animationOut={"bounceOut"} animationInTiming={300} onBackdropPress={()=>setModalVisible(false)}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              height: '30%',
              width: '100%',
              backgroundColor: 'white',
              flexDirection: 'column',
              borderRadius:16,
              padding: 20,
            }}>
            <Text
              style={{
                fontFamily: ramarajaReguler,
                color: '#374151',
                fontSize: height * 0.032,
                marginBottom: height * 0.003,
              }}>
              Tentang
            </Text>
            <Text
              style={{
                fontFamily: caladeaReguler,
                color: '#707070',
                fontSize: height * 0.025,
              }}>
              Lapor Pak Sumbar adalah Aplikasi untuk pengaduan masyarakat
              Provinsi Sumatera Barat
            </Text>
            <View
              style={{
                alignItems: 'flex-end',
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    fontFamily: caladeaBold,
                    color: '#EBC730',
                    fontSize: height * 0.028,
                  }}>
                  Tutup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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
    paddingVertical: 30,
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
    position:"absolute",
    bottom:height*0.012,
    left:0,
    right:0,
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
