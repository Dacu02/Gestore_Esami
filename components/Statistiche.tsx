
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { primary_color, secondary_color, tertiary_color } from '../global';
import Header from './Header';




const Box = (props: any) => (
    <View style={props.style.boxContainer} >
        <Text style={props.style.boxText}>{props.description}</Text>
        <Text style={props.style.boxValue}>{props.value}</Text>
    </View>
)

const Statistiche = () => {

    
    const getTema = async () =>
        (await AsyncStorage.getItem('tema') === 'dark')

    const [tema, setTema] = useState(true)

    useEffect(() => {
        getTema().then(value => setTema(value))
    }, [])

    const style = StyleSheet.create({
        boxContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            borderRadius: 25,
            backgroundColor: primary_color(tema),
            borderColor: secondary_color,
            borderWidth: 2,
            paddingVertical: "3.75%",
            paddingHorizontal: "5%",
        },
        boxText: {
            color: tertiary_color(tema),
            fontSize: 20, //TODO setta da dimensions
            textAlign: "center",
            marginBottom: "7%",
        },
        boxValue: {
            color: tertiary_color(tema),
            fontSize: 60, //TODO setta da dimensions
            textAlign: "center",
            fontWeight: "bold",
        },
        flexContainer: { //TODO versione landscape mancante
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: "10%",
        }
    })
    return (
        <View style={{backgroundColor: primary_color(tema), height: "100%"}}>
        <Header scuro={tema} />
            <View style={style.flexContainer}>
                <Box description="Voto di laurea corrente" value="10" style={style} />
            </View>
            <View style={style.flexContainer}>
                <Box description="Voto min" value="10" style={style} />
                <Box description="Voto medio" value="10" style={style} />
                <Box description="Voto max" value="10" style={style} />
            </View>
            <View style={style.flexContainer}>
                <Box description="Media ponderata" value="10" style={style} />
            </View>
            <View style={style.flexContainer}>
                <Box description="Esami superati" value="10" style={style} />
                <Box description="Previsione Voto Futuro" value="10" style={style} />
            </View>
        </View>
    )
}
export default Statistiche