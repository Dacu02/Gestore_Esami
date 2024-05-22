import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Footer from "./Footer";
import { primary_color, secondary_color, tertiary_color } from '../global'
const Promemoria = (props) => {
    return (
        <View style={style.promemoria}>
            <Text style={style.titoloPromemoria}>{props.nome}</Text>
            <View style={style.contenutoPromemoria}>
                {props.corso ? <Text style={style.testoPromemoria}>Corso: {props.corso}</Text> : null}
                {props.cfu ? <Text style={style.testoPromemoria}>CFU: {props.cfu}</Text> : null}
                {props.tipologia ? <Text style={style.testoPromemoria}>Tipologia: {props.tipologia}</Text> : null}
                {props.docente ? <Text style={style.testoPromemoria}>Docente: {props.docente}</Text> : null}
            </View>
            <View>

            {props.luogo ? <Text style={style.luogoPromemoria}>Luogo: {props.luogo}</Text> : null}
            <Text style={style.dataPromemoria}>{props.data} {props.ora}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    promemoria: {
        backgroundColor: "#ddd",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: tertiary_color,
    },
    titoloPromemoria: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#084197",
        textAlign: "center",
    },
    contenutoPromemoria: {
        marginLeft: 10,
    },
    testoPromemoria: {
        fontSize: 18,
        color: "black",
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
const Esame = ({ navigation }: any) => {
    /*: nome, corso di studi,
CFU, data, ora, luogo, tipologia d’esame, docente, voto */
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

    return (
        <>
            {testData.map((esame, index) => <Promemoria key={index} {...esame} />)}

            <Footer navigation={navigation} />
        </>
    )
}

export default Esame