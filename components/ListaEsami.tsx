import React, { useEffect, useContext, useState, createContext } from "react"
import { Settings, StyleSheet, Text, Image, View, TextInput, Modal, Dimensions, TouchableOpacity, Pressable, Switch, FlatList } from "react-native"
import Footer from "./Footer"
import { primary_color, secondary_color, tertiary_color } from '../global'
import Header from "./Header"
import { faCalendarDays, faGear } from "@fortawesome/free-solid-svg-icons"
import { DataBase, DataBaseContext } from "./DataBase"
import SQLite from 'react-native-sqlite-storage'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SelectList } from "react-native-dropdown-select-list"


export default function ListaEsami(){
    
    
    const db = useContext(DataBaseContext);

    const esame = [
            //cambiare il nome dell'esame passando gli esami sul database
            //fixare le immagini
        { id: 1 ,name: 'nomeEsame', image: require('../immaginiEsami/EsameSuperato.png'), voto:"28"},
        { id: 2 ,name: 'nomeEsame', image: require('../immaginiEsami/EsameNonSuperato.png'), voto:"18"},
        { id: 3 ,name: 'nomeEsame', image: require('../immaginiEsami/EsameNonSuperato.png'), voto:"25"},
        { id: 4 ,name: 'nomeEsame', image: require('../immaginiEsami/EsameInAttesa.png'), voto:"30L"},
        { id: 5 ,name: 'nomeEsame', image: require('../immaginiEsami/EsameSuperato.png'), voto:"28"},
    ];


//interfaccia per i tipi di Esame altrimenti abbiamo difficoltà con tsx
interface EsameItem{
    id:number,
    name:string,
    image:any,
    voto:string
}

const singoloEsame = ({item} :{item:EsameItem}) => (
    <View style={styles.item}>
        <View style={styles.immagineContainer}>
            <Image source={item.image} style={styles.immagine}/>
        </View>
        <View style={styles.progressoEsame}>
            <Text style={{color:'white'}}>{item.voto}</Text>
        </View>
    <Text style={styles.name}>{item.name}</Text>
    </View>
)

const headerComponent = () => {
    return <Text style={styles.listHeadline}> Lista Esami </Text>
}

const itemSeparator = () =>{
 return <View style={styles.separator}></View>
}

return(

<View>
    <FlatList
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={headerComponent}
        data={esame}
        renderItem={singoloEsame}
        ItemSeparatorComponent={ itemSeparator }
        />
</View>
);

}

const styles = StyleSheet.create({

listHeader:{
        height:55,
        alignItems:'center',
        justifyContent:'center',
        
        },
listHeadline:{
        color:'#333',
        fontSize:22,
        fontWeight:'bold'
        },
item:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:13,
    
},
immagineContainer:{
    backgroundColor:'D9D9D9',
    borderRadius: 100,
    height:89,
    width:89,
    justifyContent:'center',
    alignItems:'center',
},
immagine:{
    height:55,
    width:55,
},
name:{
    fontWeight:'600',
    fontSize:16,
    marginLeft:13,
},
separator:{
    height:1,
    width:'100%',        
    backgroundColor:'#CCC',
    },
progressoEsame:{
        height:34,
        width:34,
        backgroundColor:"green",
        alignItems:'center',
        justifyContent:'center',
        borderRadius:17,
        position:'absolute',
        top:34,
        right:15,
        
    },

});