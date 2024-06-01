import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import ListaEsami from './components/ListaEsami'
import {
  StatusBar,
  useColorScheme,
} from 'react-native'

import Home from './components/Home'
import { DataBase } from './components/DataBase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModificaEsame from './components/ModificaEsame'
import Statistiche from './components/Statistiche'

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {

  useEffect(() => {
    if(AsyncStorage.getItem('tema')===null)
      AsyncStorage.setItem('tema', useColorScheme() ? 'dark' : 'light')
  }, [])
    
  return (
    <DataBase>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}} >
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="ListaEsami" component={ListaEsami} />
          <Stack.Screen name="Statistiche" component={Statistiche} />
          <Stack.Screen name="ModificaEsame" component={ModificaEsame} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataBase>
  )

 
}

export default App;