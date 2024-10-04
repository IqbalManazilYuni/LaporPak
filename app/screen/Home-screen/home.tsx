import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const HomeScreen = ({}) => {
  return (
    <SafeAreaView style={styles.backgroundScreen}>
      <View style={styles.contentHeader}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          
        </View>
      </View>
      <View style={styles.contentImage}></View>
      <View style={styles.contentMenu}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundScreen: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  contentHeader: {
    height: '8%',
    backgroundColor: 'red',
  },
  contentImage: {
    height: '40%',
    backgroundColor: 'blue',
  },
  contentMenu: {
    height: '52%',
    backgroundColor: 'yellow',
  },
});
