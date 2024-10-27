import Toast from 'react-native-toast-message';

interface PesanProps {
    text: string;
}

export const PesanError = ({ text }: PesanProps) => {
    Toast.show({
        type: 'error',
        text1: 'Kesalahan',
        text2: text,
    });
    return null;
};
