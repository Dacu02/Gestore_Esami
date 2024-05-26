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

        { id: 1 ,name: 'a', image: require('../immaginiEsami/EsameSuperato55.png')},
        { id: 2 ,name: 'b', image: require('../immaginiEsami/EsameSuperato55.png')},
        { id: 3 ,name: 'c', image: require('../immaginiEsami/EsameSuperato55.png')},
        { id: 4 ,name: 'd', image: require('../immaginiEsami/EsameSuperato55.png')},
        { id: 5 ,name: 'e', image: require('../immaginiEsami/EsameSuperato55.png')},
    ];

    
interface EsameItem{
    id:number,
    name:string,
    image:any
}

const singoloEsame = ({item} :{item:EsameItem}) => (
    <View style={styles.item}>
        <View style={styles.immagineContainer}>
            <Image source={item.image} style={{width:55,height:55}}/>
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
    paddingVertical:13
},
immagineContainer:{
    backgroundColor:'D9D9D9',
    borderRadius: 100,
    height:89,
    width:89,
    justifyContent:'center',
    alignItems:'center',
},

name:{
    fontWeight:'600',
    fontSize:16,
    marginLeft:13,
},
separator:{
    height:1,
    width:'100%',        
    backgroundColor:'#CCC'
    },


});