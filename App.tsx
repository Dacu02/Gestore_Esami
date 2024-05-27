import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import Header from './components/Header'
import AggiungiEsame from './components/AggiungiEsame'
import ListaEsami from './components/ListaEsami'
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native'

import Esame from './components/Esame'
import { DataBase } from './components/DataBase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Statistiche from './components/Statistiche'


const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  
  
  
  
  
  if(AsyncStorage.getItem('tema')===null)
    AsyncStorage.setItem('tema', useColorScheme() ? 'dark' : 'light')
  return (
    <DataBase>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Esame' screenOptions={{headerShown: false}} >
          <Stack.Screen name="Esame" component={Esame}/>
          <Stack.Screen name="ListaEsami" component={ListaEsami} />
          <Stack.Screen name="AggiungiEsame" component={AggiungiEsame} />
          <Stack.Screen name="Statistiche" component={Statistiche} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataBase>
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
