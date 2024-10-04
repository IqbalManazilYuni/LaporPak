import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigator/AppNavigator'; // Import the RootStackParamList

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home'); // Navigate to Home screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);

  return (
    <SafeAreaView style={styles.backgroundScreen}>
      <View>
        <Text>Splash Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundScreen: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
