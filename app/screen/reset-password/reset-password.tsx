import {
  StatusBar,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/header/Header';
import {IconEye, IconLeftBack} from '../../assets';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {caladeaBold, caladeaReguler} from '../../assets/fonts/FontFamily';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import axiosInstance from '../../utils/axiosInterceptors';
import {API_BASE_URL} from '../../utils/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../navigator/AppNavigator';
import Loading from '../../components/loading/Loading';

const {height, width} = Dimensions.get('window');

export const ResetPasswordScreen = () => {
  const route = useRoute();
  const {userData} = route.params as {userData: any};
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [passwordBaruKonfirmasi, setPasswordBaruKonfirmasi] = useState('');
  const [lihatPassword, setLihatPassword] = useState(false);
  const [lihatPasswordBaru, setLihatPasswordBaru] = useState(false);
  const [lihatPasswordBaruKonfirmasi, setLihatPasswordBaruKonfirmasi] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (passwordBaru !== passwordBaruKonfirmasi) {
        Toast.show({
          type: 'error',
          text1: 'Gagal',
          text2: 'Password baru dan konfirmasi password tidak sama.',
        });
        return;
      }
      const formData = new FormData();
      formData.append('_id', userData.id);
      formData.append('password', passwordBaru);
      formData.append('password_lama', password);

      const response = await axiosInstance.put(
        `${API_BASE_URL}/api/pengguna/edit-password-mobile`,
        {
          _id: userData.id,
          password: passwordBaru,
          password_lama: password,
        },
        {headers: {'Content-Type': 'application/json'}},
      );

      console.log(response);

      if (response.data.code === 200) {
        await AsyncStorage.removeItem('authToken');
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: 'Anda Berhasil Keluar',
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = password && passwordBaru && passwordBaruKonfirmasi;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="#444444" translucent={true} />
      <Header
        TxtMiddle="Ubah Password"
        ImgBack={() => <IconLeftBack />}
        onBackPress={() => navigation.goBack()}
      />
      {loading && <Loading />}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View
              style={{width: '90%', height: '70%', backgroundColor: 'white'}}>
              <Text
                style={{
                  fontSize: height * 0.022,
                  fontFamily: caladeaBold,
                  color: 'black',
                  marginTop: 20,
                }}>
                Ganti Password
              </Text>
              <Text
                style={{
                  fontSize: height * 0.02,
                  fontFamily: caladeaReguler,
                  color: 'black',
                  marginTop: 10,
                }}>
                Setelah mengganti password, gunakan password baru untuk masuk
              </Text>

              {/* Input Password Lama */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password Lama"
                  secureTextEntry={!lihatPassword}
                  onChangeText={setPassword}
                  value={password}
                  placeholderTextColor={'#9CA3AF'}
                />
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => setLihatPassword(!lihatPassword)}>
                  <IconEye />
                </TouchableOpacity>
              </View>

              {/* Input Password Baru */}
              <View style={[styles.inputContainer, {marginTop: height * 0.1}]}>
                <TextInput
                  style={styles.input}
                  placeholder="Password Baru"
                  secureTextEntry={!lihatPasswordBaru}
                  onChangeText={setPasswordBaru}
                  value={passwordBaru}
                  placeholderTextColor={'#9CA3AF'}
                />
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => setLihatPasswordBaru(!lihatPasswordBaru)}>
                  <IconEye />
                </TouchableOpacity>
              </View>

              {/* Input Konfirmasi Password Baru */}
              <View style={[styles.inputContainer, {marginTop: height * 0.01}]}>
                <TextInput
                  style={styles.input}
                  placeholder="Konfirmasi Password Baru"
                  secureTextEntry={!lihatPasswordBaruKonfirmasi}
                  onChangeText={setPasswordBaruKonfirmasi}
                  value={passwordBaruKonfirmasi}
                  placeholderTextColor={'#9CA3AF'}
                />
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() =>
                    setLihatPasswordBaruKonfirmasi(!lihatPasswordBaruKonfirmasi)
                  }>
                  <IconEye />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.saveButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  {backgroundColor: isFormValid ? '#EBC730' : '#BEBEBE'},
                ]}
                onPress={handleSubmit}
                disabled={!isFormValid}>
                <Text style={styles.saveButtonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
    height: 50,
    backgroundColor: '#F9FAFB',
  },
  input: {
    width: '85%',
    fontFamily: caladeaReguler,
    fontSize: height * 0.02,
    color: '#9CA3AF',
    height: 50,
  },
  iconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonContainer: {
    width: '90%',
    height: '30%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  saveButton: {
    height: height * 0.075,
    borderRadius: 26,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: caladeaBold,
    color: 'white',
    fontSize: height * 0.024,
  },
});

export default ResetPasswordScreen;
