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

    const opzioniTab =(img:any)=> ({
        headerShown:false,
        tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View style={{alignItems:'center', justifyContent:'center',top:10}}>
                <Image
                source={img}
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
        )});

  return (
    <Tab.Navigator

    screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position:'absolute',
          backgroundColor: '#ffffff', 
          borderTopColor: 'transparent',
          bottom:25,
          left:20,
          right:20,
          
          borderRadius:15,
          height:90,
          ...styles.shadow
        },
        tabBarLabelStyle: {
            display: 'none', 
          },
      }}
       >
      <Tab.Screen name="Home" component={Home} 
      options={opzioniTab(require('../immaginitest/icons8-home.png'))}/>
      <Tab.Screen name="Settings" component={ModificaEsame}
      options={opzioniTab(require('../immaginitest/icons8-home.png'))}/>
      <Tab.Screen name="AggiungiEsame" component={AggiungiEsame}
      options={opzioniTab(require('../immaginitest/icons8-home.png'))}/>
      <Tab.Screen name="Azione4" component={ModificaEsame} 
      options={opzioniTab(require('../immaginitest/icons8-home.png'))}/>
      <Tab.Screen name="Azione5" component={ModificaEsame}
      options={opzioniTab(require('../immaginitest/icons8-home.png'))}/>
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