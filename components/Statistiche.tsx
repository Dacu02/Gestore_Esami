
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { primary_color, secondary_color, tertiary_color } from '../global';
import Header from './Header';




const Box = (props: any) => (
    <View style={[props.style.boxContainer, props.width ? { width: props.width } : {}]} >
        <Text style={props.style.boxText}>{props.description}</Text>
        <Text style={props.style.boxValue}>{props.value}</Text>
    </View>
)

const Statistiche = () => {


    const getOrientamento = () => (
        (Dimensions.get("screen").width > Dimensions.get("screen").height) ?
            "landscape"
            :
            "portrait"
    )
    const [orientamento, setOrientamento] = useState(getOrientamento())
    Dimensions.addEventListener("change", () => setOrientamento(getOrientamento()))


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
            paddingVertical: orientamento === 'portrait' ? "3.75%" : "1%",
            paddingHorizontal: "5%",
        },
        boxText: {
            color: tertiary_color(tema),
            fontSize: 20, //TODO setta da dimensions
            textAlign: "center",
            marginBottom: 15,
        },
        boxValue: {
            color: tertiary_color(tema),
            fontSize: 45, //TODO setta da dimensions
            textAlign: "center",
            fontWeight: "bold",
        },
        flexContainer: { //TODO versione landscape mancante
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 25,
            justifyContent: "space-evenly",
            marginTop: Dimensions.get("window").width / 25,
        }
    })
    return (
        <View style={{ backgroundColor: primary_color(tema), height: "100%" }}>
            <Header scuro={tema} title="Statistiche" />
                <View style={style.flexContainer}>
                    <Box width={orientamento==='portrait' ? "100%" : "33%"} description="Voto di laurea corrente" value="10" style={style} />
                    <Box description="Voto min" value="10" style={style} />
                    <Box width={orientamento==='portrait' ? "" : "25%"} description="Voto medio" value="10" style={style} />
                    <Box description="Voto max" value="10" style={style} />
                    <Box description="Media ponderata" value="10" style={style} />
                    <Box description="Esami superati" value="10" style={style} />
                    <Box description="Previsione Voto Futuro" value="10" style={style} />
                </View>
        </View>
    )
}
export default Statistiche