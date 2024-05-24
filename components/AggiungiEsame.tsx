import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import Footer from './Footer'
import { primary_color, secondary_color, tertiary_color } from '../global'
/*  
    ! Ogni esame riporta differenti informazioni, esempio: nome, corso di studi,
    ! CFU, data, ora, luogo, tipologia d’esame, docente, voto

    * Schermata aggiunta e modifica esame e diario
    ! 1. Deve permettere di aggiungere un nuovo esame oppure modificarne uno
    !esistente (quest’ultimo scelta dalla schermata 2).
    ? 2. Deve permettere di modificare il diario associato ad un esame.
*/


const Riga = (props: any) => {

    return (
        <View style={style.riga}>
            <Text style={style.text}>{props.testo.toUpperCase()}</Text>
            <TextInput style={style.textfield} maxLength={60} keyboardType={props.type} placeholder={"Inserisci " + props.testo.toLowerCase()} placeholderTextColor="#888" value={props.value} onChangeText={(v) => props.setValue(v)} />
        </View>
    )
}

const style = StyleSheet.create({
    riga: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        marginRight: 50,
        alignItems: "center",
        marginBottom: 15,

    },
    text: {
        color: "black",
        flex: 1,
        fontSize: 20,
        textAlign: "center",
    },
    textfield: {
        color: "black",
        fontSize: 20,
        borderColor: "#282c33",
        borderWidth: 2,
        borderRadius: 40,
        backgroundColor: "#ddd",
        padding: 10,
        flex: 1,
        textAlign: "center",
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
    },
    confirm: {
        backgroundColor: "lightgreen",
        padding: 10,
        borderRadius: 40,
        margin: 10,
    },
    deny: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 40,
        margin: 10,
    },
    confirmText: {
        color: "black",
        textAlign: "center",
        fontSize: 20,
    },
    denyText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
    },
    button: {
        flex: 1,
        borderRadius: 40,
        borderColor: tertiary_color,
        borderWidth: 2
    },
    errorMessage: {
        color: "red",
        textAlign: "center",
        fontSize: 20,
        marginTop: 20,
        backgroundColor: "#fdd",
        margin: 20,
        marginLeft: "25%",
        marginRight: "25%",
        paddingTop: "3%",
        paddingBottom: "3%",
        borderRadius: 25,
    }
})


const Esame = ({ navigation }: any) => {
    const [nome, setNome] = useState("")
    const [corso, setCorso] = useState("")
    const [voto, setVoto] = useState("")
    const [cfu, setCfu] = useState("")
    const [tipologia, setTipologia] = useState("")
    const [docente, setDocente] = useState("")
    const [data, setData] = useState("")
    const [ora, setOra] = useState("")
    const [luogo, setLuogo] = useState("")
    const [err, setErr] = useState("Arianna merda sempre e per sempre!")

    const datiEsame = {
        nome: nome,
        corso: corso,
        voto: voto,
        cfu: cfu,
        tipologia: tipologia,
        docente: docente,
        data: data,
        ora: ora,
        luogo: luogo

    }

    const setNumero = (v: string, setState:Function) => {
        if (!isNaN(Number(v))) {
            setState(v)
        }
    }

    return (
        <>
            <ScrollView>
                <Riga testo="Nome" type="default" value={nome} setValue={(v: string) => setNome(v)} />
                <Riga testo="Corso" type="default" value={corso} setValue={(v: string) => setCorso(v)} />
                <Riga testo="Voto" type="numeric" value={voto} setValue={(v: string) => setNumero(v, setVoto)} />
                <Riga testo="CFU" type="numeric" value={cfu} setValue={(v: string) => setNumero(v, setCfu)} />
                <Riga testo="Tipologia" type="default" value={tipologia} setValue={(v: string) => setTipologia(v)} />
                <Riga testo="Docente" type="default" value={docente} setValue={(v: string) => setDocente(v)} />
                <Riga testo="Data" type="default" />
                <Riga testo="Ora" type="default" />
                <Riga testo="Luogo" type="default" value={luogo} setValue={(v: string) => setLuogo(v)} />
                <View style={style.buttons}>
                    <TouchableOpacity onPress={() => console.log(datiEsame)} style={[style.confirm, style.button]}>
                        <Text style={style.confirmText}>Conferma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[style.deny, style.button]}>
                        <Text style={style.denyText}>Annulla</Text>
                    </TouchableOpacity>
                </View>
                {err ? <Text style={style.errorMessage}>{err}</Text> : null}
                    <View style={{height: 50}}/>
            </ScrollView>
            <Footer navigation={navigation} />

        </>
    )
}

export default Esame;