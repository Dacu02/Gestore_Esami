
import React, { useEffect, useContext, useState } from "react"
import { Settings, StyleSheet, Text, View, TextInput, Modal, Dimensions, TouchableOpacity, Pressable, Switch } from "react-native"
import Footer from "./Footer"
import { primary_color, secondary_color, tertiary_color } from '../global'
import Header from "./Header"
import { faCalendarDays, faGear } from "@fortawesome/free-solid-svg-icons"
import { DataBase, DataBaseContext } from "./DataBase"
import { openDatabase } from 'react-native-sqlite-storage'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SelectList } from "react-native-dropdown-select-list"

const Promemoria = (props: any) => {

    
    const getOrientamento = () => (
        (Dimensions.get("screen").width > Dimensions.get("screen").height) ?
            "landscape"
            :
            "portrait"
    )

    const [orientamento, setOrientamento] = useState(getOrientamento())

    Dimensions.addEventListener("change", () => setOrientamento(getOrientamento()))

    const [tema, setTema] = useState(true)
    
        const getTema = async () =>
            (await AsyncStorage.getItem('tema') === 'dark')

    useEffect(() => {
        getTema().then(value => setTema(value))
    })
    const styleText = StyleSheet.create({
        testo: {
            color: tertiary_color(tema),
            fontSize: 18,
        }

    })

    return (
        <View style={[style.promemoria, {backgroundColor: tema ? "#222" : "#ddd", flex: orientamento === 'portrait' ? undefined : 1}]}>
            <Text style={style.titoloPromemoria}>{props.nome}</Text>
            <View style={style.contenutoPromemoria}>
                {props.corso ? <Text style={styleText.testo}>Corso: {props.corso}</Text> : null}
                {props.cfu ? <Text style={styleText.testo}>CFU: {props.cfu}</Text> : null}
                {props.tipologia ? <Text style={styleText.testo}>Tipologia: {props.tipologia}</Text> : null}
                {props.docente ? <Text style={styleText.testo}>Docente: {props.docente}</Text> : null}
            </View>
            <View>

                {props.luogo ? <Text style={style.luogoPromemoria}>{props.luogo}</Text> : null}
                <Text style={style.dataPromemoria}>{props.data} - {props.ora}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    promemoria: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: secondary_color,
    },
    titoloPromemoria: {
        fontSize: 20,
        fontWeight: "bold",
        color: secondary_color,
        textAlign: "center",
    },
    contenutoPromemoria: {
        marginLeft: 10,
    },
    dataPromemoria: {
        fontSize: 16,
        color: secondary_color,
        textAlign: "right",
    },
    luogoPromemoria: {
        fontSize: 16,
        color: secondary_color,
        textAlign: "right",
    }
})
export default Promemoria;