import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import Footer from './Footer'
import { primary_color, secondary_color, tertiary_color } from '../global'
import DatePicker from 'react-native-date-picker'
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
        <View style={props.style.riga}>
            <Text style={props.style.text}>{props.testo.toUpperCase()}</Text>
            <TextInput style={props.style.textfield} maxLength={60} keyboardType={props.type} placeholder={"Inserisci " + props.testo.toLowerCase()} placeholderTextColor="#888" value={props.value} onChangeText={(v) => props.setValue(v)} />
        </View>
    )
}


const Esame = ({ navigation, route }: any) => {
    const [nome, setNome] = useState("")
    const [corso, setCorso] = useState("")
    const [voto, setVoto] = useState("")
    const [cfu, setCfu] = useState("")
    const [tipologia, setTipologia] = useState("")
    const [docente, setDocente] = useState("")
    const [dataOra, setDataOra] = useState(new Date())
    const [luogo, setLuogo] = useState("")
    const [err, setErr] = useState("Arianna merda sempre e per sempre!")
    const [viewDTP, setViewDTP] = useState(false)

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
            color: tertiary_color(route.params.temaScuro),
            flex: 1,
            fontSize: 20,
            textAlign: "center",
        },
        textfield: {
            color: tertiary_color(route.params.temaScuro),
            fontSize: 20,
            borderColor: secondary_color,
            borderWidth: 2,
            borderRadius: 40,
            backgroundColor: primary_color(route.params.temaScuro),
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
            backgroundColor: route.params.temaScuro ? primary_color(true) :"lightgreen",
            padding: 10,
            borderRadius: 40,
            margin: 10,
            borderWidth: 2,
            borderColor: route.params.temaScuro? "lightgreen" : tertiary_color(false),
        },
        deny: {
            backgroundColor: route.params.temaScuro? primary_color(true) : "red",
            padding: 10,
            borderRadius: 40,
            margin: 10,
            borderColor: route.params.temaScuro? "red" : tertiary_color(false),
        },
        confirmText: {
            color: tertiary_color(route.params.temaScuro),
            textAlign: "center",
            fontSize: 20,
        },
        denyText: {
            textAlign: "center",
            fontSize: 20,
            color: tertiary_color(route.params.temaScuro),
        },
        button: {
            flex: 1,
            borderRadius: 40,
            borderWidth: 2
        },
        errorMessage: {
            color: "red",
            textAlign: "center",
            fontSize: 20,
            marginTop: 20,
            backgroundColor: route.params.temaScuro ? primary_color(true): "#fdd",
            margin: 20,
            marginLeft: "25%",
            marginRight: "25%",
            paddingTop: "3%",
            paddingBottom: "3%",
            borderRadius: 25,
            borderWidth: 1,
            borderColor: route.params.temaScuro ? "red" : "transparent",
        }
    })
    
    

    const datiEsame = {
        nome: nome,
        corso: corso,
        voto: voto,
        cfu: cfu,
        tipologia: tipologia,
        docente: docente,
        dataOra: dataOra,
        luogo: luogo

    }

    const setNumero = (v: string, setState: Function) => {
        if (!isNaN(Number(v))) {
            setState(v)
        }
    }

    return (
        <View style={{backgroundColor:primary_color(route.params.temaScuro)}}>
            <ScrollView>
                <Riga style={style} testo="Nome" type="default" value={nome} setValue={setNome} />
                <Riga style={style} testo="Corso" type="default" value={corso} setValue={setCorso} />
                <Riga style={style} testo="Voto" type="numeric" value={voto} setValue={(v: string) => setNumero(v, setVoto)} />
                <Riga style={style} testo="CFU" type="numeric" value={cfu} setValue={(v: string) => setNumero(v, setCfu)} />
                <Riga style={style} testo="Tipologia" type="default" value={tipologia} setValue={setTipologia} />
                <Riga style={style} testo="Docente" type="default" value={docente} setValue={setDocente} />
                <DatePicker
                    date={dataOra}
                    onDateChange={setDataOra}
                    minuteInterval={15}
                    mode='datetime'
                    locale='it-IT'
                    modal={false}
                />
                <Riga style={style} testo="Luogo" type="default" value={luogo} setValue={(v: string) => setLuogo(v)} />
                <View style={style.buttons}>
                    <TouchableOpacity onPress={() => console.log(datiEsame)} style={[style.confirm, style.button]}>
                        <Text style={style.confirmText}>Conferma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[style.deny, style.button]}>
                        <Text style={style.denyText}>Annulla</Text>
                    </TouchableOpacity>
                </View>
                {err ? <Text style={style.errorMessage}>{err}</Text> : null}
                <View style={{ height: 50 }} />
            </ScrollView>
            <Footer navigation={navigation} scuro={route.params.temaScuro}/>

        </View>
    )
}

export default Esame;