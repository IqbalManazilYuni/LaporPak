import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigator/AppNavigator';
import Toast from 'react-native-toast-message';
import toastConfig from './components/toast/Toast';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

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
        <AppNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
