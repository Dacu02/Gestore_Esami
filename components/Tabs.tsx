import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ModificaEsame from './ModificaEsame';
import Home from './Home';
import AggiungiEsame from './AggiungiEsame';
import Esame from './Esame';
import {
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';

const CustomTabBarButton = ({children}:{children:any}, onPress:any)=>(

<TouchableOpacity
style={{
    top:-30,
    justifyContent:'center',
    alignItems:'center',
    ...styles.shadow
}}
onPress={onPress}>
    <View style={{
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:'#e32f45'
    }}>
        {children}
    </View>
</TouchableOpacity>

);

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
    <>
    
      <View name="Home" component={Home} /* Componente che porta alla home*/
      options={opzioniTab(require('../immaginitest/icons8-home.png'))}/>

      <View name="Settings" component={ ModificaEsame} /* Componente che fa qualcosa */
      options={opzioniTab(require('../immaginitest/icons8-home.png'))}/>

      <View name=" AggiungiEsame" component={AggiungiEsame} /* Componente che fa qualcosa */
      options={{tabBarIcon:({focused})=>(
      <Image
                source={require('../immaginitest/icons8-libro-50.png')}
                resizeMode="contain"
                style={{
                    width:30,
                    height:30,
                    tintColor:'#fff',
                }}
                />
            ),
            tabBarButton:(props) =>(
                <CustomTabBarButton {...props} />
            )
        }}
        />

     
      <View name="Azione4" component={ModificaEsame} /* Componente che fa qualcosa */
      options={opzioniTab(require('../immaginitest/icons8-home.png'))}/>
      <View name="Azione4" component={Esame} 
      options={opzioniTab(require('../immaginitest/icons8-home.png'))}/>
      <View name="Azione5" component={ModificaEsame}
      options={opzioniTab(require('../immaginitest/icons8-home.png'))}/>
    </> 
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