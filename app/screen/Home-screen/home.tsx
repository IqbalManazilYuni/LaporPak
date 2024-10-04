import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = ({}) => {
  return (
    <SafeAreaView style={styles.backgroundScreen}>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundScreen: {
    backgroundColor: '#f9f9f9',
  },
});
