import React from 'react';
import { Text, TextInput, View, StyleSheet } from "react-native";
import { primary_color, tertiary_color } from '../global';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Campo = (props: any) => (
    <View style={style.row}>
        <View style={style.label}>
         <FontAwesomeIcon
            icon={props.icon}
            size={16}
            style={{...style.icona, color: primary_color(props.tema)}}
        />
        <Text style={[style.text, {color: primary_color(props.tema)}]}>{props.nome.toUpperCase()}</Text>
        </View>
        <TextInput 
            placeholder={"Inserisci " + props.nome}
            placeholderTextColor={tertiary_color(props.tema)+'80'} 
            keyboardType={props.tipo ? props.tipo : 'default'} 
            style={[style.textinput, {backgroundColor: primary_color(props.tema), color: tertiary_color(props.tema)}]} 
            value={props.value} 
            onChangeText={props.onChange} 
            />
    </View>
)


const style = StyleSheet.create({
    textinput: {
        padding:15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        color: 'black'
    },
    row: {
        marginBottom: 20, 
        width: '85%',
        paddingLeft:10
    },
    text: {        
        fontFamily: 'Roboto-Italic',
        color: 'white',
        fontWeight: 'bold',
    },
    icona:{
        marginRight:10,
    },
    label:{
        marginBottom: 10,
        display:'flex',
        flexDirection:'row'
    },

})
export default Campo