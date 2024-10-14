import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast, { BaseToast, ToastConfig, BaseToastProps } from 'react-native-toast-message';
import {
    caladeaBold,
    caladeaReguler,
  } from '../../assets/fonts/FontFamily';

export const toastConfig: ToastConfig = {
    success: ({ text1, text2 }: BaseToastProps) => (
       <View style={[styles.toastStyle,]}>
            <Text style={styles.text1Style}>
                {text1}
            </Text>
            <Text style={styles.text2Style}>
                {text2}
            </Text>
        </View>
    ),
    error: ({ text1, text2 }: BaseToastProps) => (
        <View style={[styles.toastStyle, { borderLeftColor: 'red' }]}>
            <Text style={styles.text1Style}>
                {text1}
            </Text>
            <Text style={styles.text2Style}>
                {text2}
            </Text>
        </View>
    ),
    info: ({ text1, text2 }: BaseToastProps) => (
        <View style={[styles.toastStyle, { borderLeftColor: 'blue' }]}>
            <Text style={styles.text1Style}>
                {text1}
            </Text>
            <Text style={styles.text2Style}>
                {text2}
            </Text>
        </View>
    ),
};
const styles = StyleSheet.create({
    text1Style: {
        fontSize: 16,
        fontFamily: caladeaBold,
        color:"black"
    },
    text2Style: {
        fontSize: 14,
        fontFamily: caladeaReguler,
        flexWrap: 'wrap',
        width: '100%',
    },
    toastStyle: {
        width: '90%',        
        minHeight: 60,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#FFF',
        borderLeftWidth: 5,
        borderLeftColor: 'green',
        borderWidth:0.5,
    },
});

export default toastConfig;
