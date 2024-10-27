import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/header/Header';
import {IconLeftBack, IconUbahProfile} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {caladeaBold, caladeaReguler} from '../../assets/fonts/FontFamily';
import {penggunaStore} from '../../utils/PenggunaUtils';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import axiosInstance from '../../utils/axiosInterceptors';
import {API_BASE_URL} from '../../utils/server';
import {useFetchKabupatenKota} from '../../hook/kabupatenKotaHook';
import {Dropdown} from 'react-native-element-dropdown';

// Mendapatkan dimensi layar
const {height, width} = Dimensions.get('window');

export const ProfileScreen: React.FC = observer(function ProfileScreen() {
  
  const navigation = useNavigation();
  const {currentUser} = penggunaStore;
  const [isChange, setIsChange] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState(currentUser?.uri_profle); // State untuk menyimpan URI gambar
  const [isModal, setModal] = useState(false); // State untuk modal
  const {kabupatenKotaList, loading1} = useFetchKabupatenKota();
  const [nama, setNama] = useState(currentUser?.name);
  const [kontak, setKontak] = useState(currentUser?.nomor_hp);
  const [username, setUsername] = useState(currentUser?.username);
  const [addres, setAddres] = useState(currentUser?.addres);
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 1,
  };

  const handleChangeProfile = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setProfileImage(uri);
          setIsChange(true);
        }
      }
    });
  };

  const handleSubmitUbah = async () => {
    try {
      const formData = new FormData();
      formData.append('_id', currentUser?._id);
      formData.append('name', nama);
      formData.append('username', username);
      formData.append('nomor_hp', kontak);
      formData.append('addres', addres);
      if (profileImage !== null) {
        formData.append('photo', {
          uri: profileImage,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      }
      console.log(formData);

      const response = await axiosInstance.put(
        `${API_BASE_URL}/api/pengguna/edit-pengguna-mobile`,
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );
      console.log('Response:', response.data);
      if (response.data.code === 200) {
        await penggunaStore.logout();
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUbahData = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="#444444" translucent={true} />
      <Header
        TxtMiddle="Profile"
        ImgBack={() => <IconLeftBack />}
        onBackPress={() => navigation.goBack()}
      />
      <View style={{flex: 1, width: '100%', height: '100%'}}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleChangeProfile}>
            {profileImage ? (
              <Image
                source={{uri: profileImage}}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require('../../assets/boy.png')}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <View style={{width: '85%'}}>
              <Text style={styles.fontTitle}>Nama</Text>
              {isChange === true ? (
                <Text style={styles.fontDeskripsi}>{nama}</Text>
              ) : (
                <Text style={styles.fontDeskripsi}>{currentUser?.name}</Text>
              )}
            </View>
            <View style={{width: '15%'}}>
              <TouchableOpacity onPress={handleUbahData}>
                <IconUbahProfile />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.fontTitle}>Username</Text>
            {isChange === true ? (
              <Text style={styles.fontDeskripsi}>{username}</Text>
            ) : (
              <Text style={styles.fontDeskripsi}>{currentUser?.username}</Text>
            )}
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.fontTitle}>Kontak</Text>
            {isChange === true ? (
              <Text style={styles.fontDeskripsi}>{kontak}</Text>
            ) : (
              <Text style={styles.fontDeskripsi}>{currentUser?.nomor_hp}</Text>
            )}
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.fontTitle}>Alamat</Text>
            {isChange === true ? (
              <Text style={styles.fontDeskripsi}>{addres}</Text>
            ) : (
              <Text style={styles.fontDeskripsi}>{currentUser?.addres}</Text>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {isChange ? (
            <TouchableOpacity
              style={styles.greenButton}
              onPress={handleSubmitUbah}>
              <Text style={styles.buttonText}>Ubah Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.yellowButton}>
              <Text style={styles.buttonText}>Ubah Password</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Modal */}
      <Modal visible={isModal} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontSize: height * 0.02,
                fontFamily: caladeaBold,
                color: 'black',
              }}>
              Ubah Profile
            </Text>
            <Text
              style={{
                fontFamily: caladeaBold,
                fontSize: height * 0.018,
                marginTop: height * 0.02,
              }}>
              Nama
            </Text>
            <TextInput
              style={{
                width: '98%',
                fontFamily: caladeaReguler,
                fontSize: height * 0.02,
                color: '#9CA3AF',
                borderWidth: 0.5,
                marginVertical: 5,
                borderRadius: 8,
              }}
              placeholder="Nama"
              onChangeText={e => {
                setNama(e);
                setIsChange(true);
              }}
              value={nama ? nama : ''}
              placeholderTextColor={'#9CA3AF'}
            />
            <Text
              style={{
                fontFamily: caladeaBold,
                fontSize: height * 0.018,
                marginTop: 5,
              }}>
              Username
            </Text>
            <TextInput
              style={{
                width: '98%',
                fontFamily: caladeaReguler,
                fontSize: height * 0.02,
                color: '#9CA3AF',
                borderWidth: 0.5,
                marginVertical: 5,
                borderRadius: 8,
              }}
              placeholder="Username"
              onChangeText={e => {
                setUsername(e);
                setIsChange(true);
              }}
              value={username ? username : ''}
              placeholderTextColor={'#9CA3AF'}
            />
            <Text
              style={{
                fontFamily: caladeaBold,
                fontSize: height * 0.018,
                marginTop: 5,
              }}>
              Kontak
            </Text>
            <TextInput
              style={{
                width: '98%',
                fontFamily: caladeaReguler,
                fontSize: height * 0.02,
                color: '#9CA3AF',
                borderWidth: 0.5,
                marginVertical: 5,
                borderRadius: 8,
              }}
              placeholder="Kontak"
              onChangeText={e => {
                setKontak(e);
                setIsChange(true);
              }}
              value={kontak ? kontak : ''}
              placeholderTextColor={'#9CA3AF'}
            />
            <Text
              style={{
                fontFamily: caladeaBold,
                fontSize: height * 0.018,
                marginTop: 5,
              }}>
              Addres
            </Text>
            <Dropdown
              data={kabupatenKotaList.map(item => ({
                value: item.kabupatenkota,
                title: item.kabupatenkota,
              }))}
              maxHeight={250}
              searchPlaceholder="Search..."
              search
              value={addres}
              inputSearchStyle={styles.oNselectedTextStyle}
              dropdownPosition="top"
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              onChange={item => {
                setAddres(item.value);
                setIsChange(true);
              }}
              placeholder="Pilih Kota"
              labelField="title"
              valueField="value"
              style={{
                width: '98%',
                padding: 10,
                height: 50,
                borderWidth: 0.5,
                marginVertical: 5,
                borderRadius: 8,
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  profileContainer: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: height * 0.2,
    width: height * 0.2,
    borderRadius: height * 0.1,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'black',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  detailsContainer: {
    height: '50%',
    flexDirection: 'column',
    paddingLeft: 16,
    width: '100%',
  },
  row: {
    marginVertical: 5,
    flexDirection: 'row',
    width: '100%',
  },
  infoBlock: {
    marginVertical: 5,
  },
  fontTitle: {
    fontFamily: caladeaReguler,
    fontSize: height * 0.02,
    color: '#444444',
  },
  fontDeskripsi: {
    fontFamily: caladeaReguler,
    fontSize: height * 0.024,
    color: 'black',
    marginTop: height * 0.005,
  },
  buttonContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenButton: {
    height: height * 0.075,
    borderRadius: 26,
    backgroundColor: 'green',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowButton: {
    height: height * 0.075,
    borderRadius: 26,
    backgroundColor: '#EBC730',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: caladeaBold,
    color: 'white',
    fontSize: height * 0.024,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  placeholderStyle: {
    fontFamily: caladeaReguler,
    color: '#9CA3AF',
    fontSize: height * 0.02,
  },
  selectedTextStyle: {
    fontFamily: caladeaReguler,
    fontSize: height * 0.02,
    color: '#9CA3AF',
  },
  oNselectedTextStyle: {
    fontFamily: caladeaReguler,
    fontSize: height * 0.02,
    color: '#9CA3AF',
  },
});

export default ProfileScreen;
