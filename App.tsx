import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import Tabs from './components/Tabs';
import AggiungiEsame from './components/AggiungiEsame';
import type { PropsWithChildren } from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Footer from './components/Footer';
import Esame from './components/Esame';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Esame' screenOptions={{ header: () => <Header title="Testo Header" /> }} >
          <Stack.Screen name="Esame" component={Esame} />
          <Stack.Screen name="AggiungiEsame" component={AggiungiEsame} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )


}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
