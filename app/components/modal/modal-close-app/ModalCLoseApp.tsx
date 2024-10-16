import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {caladeaBold} from '../../../assets/fonts/FontFamily';

interface ModalCLoseAppProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExit: () => void;
}

const ModalCLoseApp: React.FC<ModalCLoseAppProps> = ({
  isOpen,
  onClose,
  onConfirmExit,
}) => (
  <Modal
    isVisible={isOpen}
    animationIn="bounceIn"
    animationOut="bounceOut"
    animationInTiming={300}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Apakah Anda yakin ingin keluar?</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Tidak</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirmExit} style={styles.button}>
            <Text style={styles.buttonText}>Ya</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: '#EBC830',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: caladeaBold,
  },
});

export default ModalCLoseApp;
