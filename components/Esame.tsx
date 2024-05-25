import React, { useEffect, useContext, useState } from "react"
import { Settings, StyleSheet, Text, View, TextInput, Modal, Dimensions } from "react-native"
import Footer from "./Footer"
import { primary_color, secondary_color, tertiary_color } from '../global'
import Header from "./Header"
import { faCalendarDays, faGear } from "@fortawesome/free-solid-svg-icons"
import { DataBase, DataBaseContext } from "./DataBase"
import { openDatabase } from 'react-native-sqlite-storage'
const Promemoria = (props: any) => {

    return (
        <View style={props.style.promemoria}>
            <Text style={props.style.titoloPromemoria}>{props.nome}</Text>
            <View style={props.style.contenutoPromemoria}>
                {props.corso ? <Text style={props.style.testoPromemoria}>Corso: {props.corso}</Text> : null}
                {props.cfu ? <Text style={props.style.testoPromemoria}>CFU: {props.cfu}</Text> : null}
                {props.tipologia ? <Text style={props.style.testoPromemoria}>Tipologia: {props.tipologia}</Text> : null}
                {props.docente ? <Text style={props.style.testoPromemoria}>Docente: {props.docente}</Text> : null}
            </View>
            <View>

                {props.luogo ? <Text style={props.style.luogoPromemoria}>{props.luogo}</Text> : null}
                <Text style={props.style.dataPromemoria}>{props.data} - {props.ora}</Text>
            </View>
        </View>
    )
}


const setCalendar = () => {
    console.log("Calendario")
}


const Esame = ({ navigation, route }: any) => {

    

    const getOrientamento = () => (
        (Dimensions.get("screen").width > Dimensions.get("screen").height) ?
            "landscape"
            :
            "portrait"
    )

    const [orientamento, setOrientamento] = useState(getOrientamento())

    const style = StyleSheet.create({
        promemoria: {
            backgroundColor: route.params.temaScuro ? "#222" : "#ddd",
            padding: 10,
            margin: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: secondary_color,
            flex: orientamento=='portrait'? undefined:1,
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
        testoPromemoria: {
            fontSize: 18,
            color: tertiary_color(route.params.temaScuro),
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
        },
        modal: {
            margin: "auto",
            marginTop: "30%",
            width: "80%",
            backgroundColor: primary_color(route.params.temaScuro),
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
        },
        viewPromemoria: {
            display: "flex",
            flexDirection: orientamento ==='portrait' ? "column" : "row",
        }
    })

    const [data, setData] = useState([])

    console.log(useContext(DataBaseContext))

    const [setting, setSetting] = useState(false)

    const testData = [{
        nome: "Esame di Sistemi Operativi",
        corso: "Informatica",
        cfu: 9,
        tipologia: "Scritto",
        docente: "Prof. Mario Rossi",
        voto: 30,
        data: "22/06/2024",
        ora: "14:30",
        luogo: "Aula 1"
    },
    {
        nome: "Esame di Analisi 1",
        corso: "Matematica",
        cfu: 9,
        tipologia: "Scritto",
        docente: "Prof Maria Bianchi",
        voto: 30,
        data: "22/06/2024",
        ora: "15:30",
        luogo: "Aula 2"
    }]

    Dimensions.addEventListener("change", () => setOrientamento(getOrientamento()))

    return (
        <View style={{ backgroundColor: primary_color(route.params.temaScuro), minHeight: "100%" }}>
            <Modal visible={setting} animationType="fade" onRequestClose={() => setSetting(false)}>
                <View style={style.modal}>
                    <Text style={style.modalTitle}>Impostazioni</Text>
                </View>
            </Modal>
            <Header title="Lista esami" leftIcon={faGear} onPressLeft={() => setSetting(true)} rightIcon={faCalendarDays} onPressRight={setCalendar} scuro={route.params.temaScuro} />
            
            <View style={style.viewPromemoria}>
                {testData.map((esame, index) => <Promemoria key={index} {...esame} style={style} />)}
            </View>

            <Footer navigation={navigation} scuro={route.params.temaScuro} />
        </View>
    )
}

export default Esame