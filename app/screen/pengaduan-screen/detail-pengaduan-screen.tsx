import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/header/Header';
import {IconLeftBack} from '../../assets';
import {useNavigation} from '@react-navigation/native';

export const DetailPengaduanScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#444444'} translucent={true} />
      <Header
        TxtMiddle="Detail Pengaduan"
        ImgBack={() => <IconLeftBack />}
        onBackPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
