import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView, Switch, Dimensions } from 'react-native'
import Footer from './Footer'
import { primary_color, secondary_color, tertiary_color } from '../global'
import DatePicker from 'react-native-date-picker'
import { DataBaseContext } from './DataBase'
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


      

    const getOrientamento = () => (
        (Dimensions.get("screen").width > Dimensions.get("screen").height) ?
            "landscape"
            :
            "portrait"
    )

    const [orientamento, setOrientamento] = useState(getOrientamento())


    const [nome, setNome] = useState("")
    const [corso, setCorso] = useState("")
    const [voto, setVoto] = useState()
    const [lode, setLode] = useState(false)
    const [cfu, setCfu] = useState("")
    const [tipologia, setTipologia] = useState("")
    const [docente, setDocente] = useState("")
    const [dataOra, setDataOra] = useState(new Date())
    const [luogo, setLuogo] = useState("")
    const [diario, setDiario] = useState("")
    const [err, setErr] = useState("")
    const [viewDTP, setViewDTP] = useState(false)

    const style = StyleSheet.create({
        riga: {
            display: "flex",
            flexDirection: orientamento==='portrait'?"row":"column",
            marginTop: 20,
            alignItems: "center",
            marginBottom: 10,
            margin: 'auto',
        },
        text: {
            color: tertiary_color(route.params.temaScuro),
            flex: 1,
            fontSize: 20,
            maxWidth: orientamento==='portrait'?"40%":"auto",
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
            alignContent: "center",
            marginLeft: orientamento==='portrait' ? "5%": 0,
            marginRight: orientamento==='portrait'?"10%":0,
        },
        switch: {
            flex: 1,
            position: "relative",
            right: orientamento==='portrait'?"390%":"auto",
        },
        buttons: {
            display: "flex",
            flexDirection: "row",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 30,
        },
        confirm: {
            backgroundColor: route.params.temaScuro ? primary_color(true) : "lightgreen",
            padding: 10,
            borderRadius: 40,
            margin: 10,
            borderWidth: 2,
            borderColor: route.params.temaScuro ? "lightgreen" : tertiary_color(false),
        },
        deny: {
            backgroundColor: route.params.temaScuro ? primary_color(true) : "red",
            padding: 10,
            borderRadius: 40,
            margin: 10,
            borderColor: route.params.temaScuro ? "red" : tertiary_color(false),
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
            backgroundColor: route.params.temaScuro ? primary_color(true) : "#fdd",
            margin: 20,
            marginLeft: "25%",
            marginRight: "25%",
            paddingTop: "3%",
            paddingBottom: "3%",
            borderRadius: 25,
            borderWidth: 1,
            borderColor: route.params.temaScuro ? "red" : "transparent",
        },
        diary: {
            width: "75%",
            padding: 20,
            borderWidth: 2,
            borderColor: secondary_color,
            borderRadius: 25,
            margin: "auto",
            fontSize: 20,
        }, 
        container: {
            backgroundColor: primary_color(route.params.temaScuro),
        },
        box: orientamento==='portrait'?{}:{
            display: "flex",
            flexDirection: "row",
        },
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

    const db = useContext(DataBaseContext)


    const submit = () => {
        if (nome == "") {
            setErr("Inserisci il nome dell'esame")
            return
        }
        if (corso == "") {
            setErr("Inserisci il corso di studi")
            return
        }
        if (cfu == "") {
            setErr("Inserisci i CFU")
            return
        }
        const d = new Date()
        if (voto == "" && dataOra < d) {
            setErr("Inserisci una data futura per un esame non ancora sostenuto")
            return
        }

        if (!(voto && !isNaN(voto) && voto > 17 && voto < 31)) {
            setErr("Inserisci un voto tra 18 e 30")
            return
        }


        if (Object.keys(db).length === 0) { // Se il database è stato inizializzato
            setErr("Errore interno")
            return
        }

        (db as any).executeSql('insert into esame (nome, corso, cfu, tipologia, docente, voto, lode, data, ora, luogo, diario) values (?,?,?,?,?,?,?,?,?,?,?)',
            [nome, corso, cfu, tipologia, docente, voto, lode, dataOra.toLocaleDateString(), dataOra.toLocaleTimeString(), luogo, diario], (tx: any, res: any) => {
                if (res.rowsAffected > 0) {
                    navigation.goBack()
                } else {
                    setErr("Errore inserimento dati")
                }
            }, (err: any) => {
                if (err.message.contains("UNIQUE constraint failed")) 
                    setErr("Esame già presente")
                else
                    setErr(err.message)
            }
        )

    }

    return (
            <ScrollView contentContainerStyle={style.container}>
                <View style={style.box}>
                <Riga style={style} testo="Nome" type="default" value={nome} setValue={setNome} />
                <Riga style={style} testo="Corso" type="default" value={corso} setValue={setCorso} />
                <Riga style={style} testo="Voto" type="numeric" value={voto} setValue={(v: string) => { setNumero(v, setVoto); setLode(false) }} />
                </View>
                {voto && !isNaN(voto) && parseInt(voto) == 30 ?
                    <View style={style.riga}>
                        <Text style={style.text}>LODE</Text>
                        <Switch style={style.switch} thumbColor={secondary_color} value={lode} onValueChange={setLode} />
                    </View>
                    : null
                }
                <View style={style.box}>
                <Riga style={style} testo="CFU" type="numeric" value={cfu} setValue={(v: string) => setNumero(v, setCfu)} />
                <Riga style={style} testo="Tipologia" type="default" value={tipologia} setValue={setTipologia} />
                <Riga style={style} testo="Docente" type="default" value={docente} setValue={setDocente} />
                <Riga style={style} testo="Luogo" type="default" value={luogo} setValue={(v: string) => setLuogo(v)} />
                </View>
                <View style={{ margin: "auto" }}>
                    <DatePicker
                        date={dataOra}
                        onDateChange={setDataOra}
                        minuteInterval={15}
                        mode='datetime'
                        locale='it-IT'
                        modal={false}
                        theme={route.params.temaScuro ? 'dark' : 'light'}
                    />
                </View>
                <Text style={[style.text, { marginTop: "10%" }]} >DIARIO</Text>
                <TextInput style={style.diary} numberOfLines={4} multiline={true} value={diario} onChangeText={setDiario} />
                <View style={style.buttons}>
                    <TouchableOpacity onPress={submit} style={[style.confirm, style.button]}>
                        <Text style={style.confirmText}>Conferma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[style.deny, style.button]}>
                        <Text style={style.denyText}>Annulla</Text>
                    </TouchableOpacity>
                </View>
                {err ? <Text style={style.errorMessage}>{err}</Text> : null}
                {/* <View style={{ height: 50 }} /> */}
            </ScrollView>
    )
}

export default Esame;