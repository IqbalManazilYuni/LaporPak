import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigator/AppNavigator';
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Dimensions, StyleSheet, View} from 'react-native';

const {width} = Dimensions.get('window');

const queryClient = new QueryClient();

const App = () => {
  const handleStateChange = (state: any) => {
    const route = state.routes[state.index];
    const currentScreen = route.name;
    console.log('Current Screen:', currentScreen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer onStateChange={handleStateChange}>
        <View style={styles.container}>
          <AppNavigator />
          <Toast />
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 816 ,
    alignSelf: 'center', // Memastikan tampilan berada di tengah
    // paddingHorizontal: 16, // Tambahkan padding untuk memberikan jarak dari sisi layar
  },
});


export default App;
