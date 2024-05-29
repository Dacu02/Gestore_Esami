import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { primary_color, secondary_color, tertiary_color } from '../global';
import Header from './Header';
import ListaEsami from './ListaEsami';

const Box = (props: any) => (
    <View style={[props.style.boxContainer, props.width ? { width: props.width } : {}]} >
        <Text style={props.style.boxText}>{props.description}</Text>
        <Text style={props.style.boxValue}>{props.value}</Text>
    </View>
)
const ChartComponent = () => {
  const GRAPH_H =400;
  const GRAPH_W =370;
  
    return (
      <View style={style.container}>
        
      </View>
    );
};

const Statistiche = () => {

    const getOrientamento = () => (
        (Dimensions.get("screen").width > Dimensions.get("screen").height) ?
            "landscape"
            :
            "portrait"
    )
    const [orientamento, setOrientamento] = useState(getOrientamento())
    Dimensions.addEventListener("change", () => setOrientamento(getOrientamento()))

    const [tema, setTema] = useState(true)

    useEffect(() => {
        getTema().then(value => setTema(value))
    }, [])

    const getTema = async () =>
        (await AsyncStorage.getItem('tema') === 'dark')

    return (
        <View style={{ backgroundColor: primary_color(tema), height: "100%" }}>
            <Header scuro={tema} title="Statistiche" />
            <View style={[style.flexContainer, { marginTop: Dimensions.get("window").width / 25 }]}>
                <Box width={orientamento === 'portrait' ? "100%" : "33%"} description="Voto di laurea corrente" value="10" style={style} />
                <Box description="Voto min" value="10" style={style} />
                <Box width={orientamento === 'portrait' ? "" : "25%"} description="Voto medio" value="10" style={style} />
                <Box description="Voto max" value="10" style={style} />
                <Box description="Media ponderata" value="10" style={style} />
                <Box description="Esami superati" value="10" style={style} />
                <Box description="Previsione Voto Futuro" value="10" style={style} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    boxContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        borderRadius: 25,
        borderColor: secondary_color,
        borderWidth: 2,
        paddingVertical: "3.75%",
        paddingHorizontal: "5%",
    },
    boxText: {
        fontSize: 20, //TODO setta da dimensions
        textAlign: "center",
        marginBottom: 15,
    },
    boxValue: {
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
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
})

export default Statistiche
