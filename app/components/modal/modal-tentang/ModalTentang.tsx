import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Modal} from 'react-native';
import {
  caladeaBold,
  caladeaReguler,
  ramarajaReguler,
} from '../../../assets/fonts/FontFamily';

const {height} = Dimensions.get('window');

interface ModalTentangProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTentang: React.FC<ModalTentangProps> = ({isOpen, onClose}) => {
  if (!isOpen) return null;

  return (
    <Modal visible={isOpen} animationType="fade" transparent={true}>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
        }}
        onPress={onClose}>
        <View
          style={{
            height: '30%',
            width: '90%',
            backgroundColor: 'white',
            flexDirection: 'column',
            borderRadius: 16,
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
            Lapor Pak Sumbar adalah Aplikasi untuk pengaduan masyarakat Provinsi
            Sumatera Barat
          </Text>
          <View
            style={{
              alignItems: 'flex-end',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={onClose}>
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
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalTentang;
