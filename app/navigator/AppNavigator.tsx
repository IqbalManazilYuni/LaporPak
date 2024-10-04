import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screen/Home-screen/home';
import { SplashScreen } from '../screen/splash-screen/splash-screen';

type RootStackParamList = {
  Home: undefined;
  Splash: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
