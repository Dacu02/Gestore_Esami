import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ModificaEsame from './ModificaEsame';
import Home from './Home';
import AggiungiEsame from './AggiungiEsame';
import {
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator

    screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position:'absolute',
          backgroundColor: '#ffffff', // Imposta il colore di sfondo della barra di navigazione
          borderTopColor: 'transparent',
          bottom:25,
          left:20,
          right:20,
          
          borderRadius:15,
          height:90,
          ...styles.shadow
        },
        tabBarActiveTintColor: 'your_color_here', // Imposta il colore dell'icona e dell'etichetta dell'elemento selezionato
        tabBarInactiveTintColor: 'your_color_here', // Imposta il colore dell'icona e dell'etichetta degli elementi non selezionati
        tabBarLabelStyle: {
          fontSize: 16, // Imposta la dimensione del testo dell'etichetta
          fontWeight: 'bold', // Imposta lo stile del testo dell'etichetta (opzionale)
        },
        tabBarIconStyle: {
          // Stile per le icone della barra di navigazione (opzionale)
        },
      }}
       >
      <Tab.Screen name="Home" component={Home}
      options={{
        tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center', justifyContent:'center',top:10}}>
                <Image
                source={require('../immaginitest/icons8-home.png')}
                resizeMode="contain"
                style={{
                    width:25,
                    height:25,
                    tintColor:focused ? '#e32f45' : '#748c94',
                }}
                />
                <Text
                style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                    HOME
                </Text>
            </View>
        )
      }}/>
      <Tab.Screen name="Settings" component={ModificaEsame} />
      <Tab.Screen name="AggiungiEsame" component={AggiungiEsame} />
      <Tab.Screen name="Azione4" component={ModificaEsame} />
      <Tab.Screen name="Azione5" component={ModificaEsame} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
shadow: {
shadowColor:'#7F5DF0',/* ios*/
    shadowOffset:{/* ios*/
        width:0,/* ios*/
        height:10,/* ios*/
    },
    shadowOpacity:0.25,/* ios*/
    shadowRadius:3.5,/* ios*/

    elevation:5,/* android*/
}
});

export default Tabs;