import React from 'react';
import { Text, TextInput, View, StyleSheet } from "react-native";
import { primary_color, tertiary_color } from '../global';

const Campo = (props: any) => (
    <View style={style.row}>
        <Text style={[style.text, {color: primary_color(props.tema)}]}>{props.nome.toUpperCase()}</Text>
        <TextInput 
            placeholder={"Inserisci " + props.nome}
            placeholderTextColor={tertiary_color(props.tema)+'80'} 
            keyboardType={props.tipo ? props.tipo : 'default'} 
            style={[style.textinput, {backgroundColor: primary_color(props.tema)}]} 
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
        marginBottom: 10
    },

})
export default Campo