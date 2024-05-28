import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView, Switch, Dimensions, Modal, Pressable } from 'react-native'
import { primary_color, secondary_color, tertiary_color } from '../global'
import { DataBaseContext } from './DataBase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from './Header'
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import TimePicker from '@react-native-community/datetimepicker'
import SQLite from 'react-native-sqlite-storage'

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




const Esame = ({ navigation }: any) => {

    const [openCalendar, setOpenCalendar] = useState(false)
    const [openClock, setOpenClock] = useState(false)





    const getOrientamento = () => (
        (Dimensions.get("screen").width > Dimensions.get("screen").height) ?
            "landscape"
            :
            "portrait"
    )
    const [orientamento, setOrientamento] = useState(getOrientamento())
    Dimensions.addEventListener("change", () => setOrientamento(getOrientamento()))


    const [nome, setNome] = useState("")
    const [corso, setCorso] = useState("")
    const [voto, setVoto] = useState()
    const [lode, setLode] = useState(false)
    const [cfu, setCfu] = useState("")
    const [tipologia, setTipologia] = useState("")
    const [docente, setDocente] = useState("")
    const [luogo, setLuogo] = useState("")
    const [diario, setDiario] = useState("")
    const [err, setErr] = useState("")
    const [data, setData] = useState(new Date())
    const [ora, setOra] = useState(new Date())

    const getTema = async () =>
        (await AsyncStorage.getItem('tema') === 'dark')

    const [tema, setTema] = useState(true)

    useEffect(() => {
        getTema().then(value => setTema(value))
    }, [])

    const style = StyleSheet.create({
        riga: {
            display: "flex",
            flexDirection: orientamento === 'portrait' ? "row" : "column",
            marginTop: 20,
            alignItems: "center",
            marginBottom: 10,
            margin: 'auto',
        },
        text: {
            fontWeight: 'bold',
            color: tertiary_color(tema),
            flex: 1,
            fontSize: 20,
            maxWidth: orientamento === 'portrait' ? "40%" : "auto",
            textAlign: "center",
        },
        textfield: {
            color: tertiary_color(tema),
            fontSize: 20,
            borderColor: secondary_color,
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: primary_color(tema),
            padding: 10,
            flex: 1,
            textAlign: "center",
            alignContent: "center",
            marginLeft: orientamento === 'portrait' ? "5%" : 0,
            marginRight: orientamento === 'portrait' ? "10%" : 0,
        },
        switch: {
            flex: 1,
            position: "relative",
            right: orientamento === 'portrait' ? "390%" : "auto",
        },
        buttons: {
            display: "flex",
            flexDirection: "row",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 40,
            justifyContent: 'space-evenly'
        },
        confirm: {
            backgroundColor: tema ? primary_color(true) : "#3762a3",
            padding: 10,
            margin: 10,
            borderColor: tema ? "lightgreen" : tertiary_color(false),
        },
        deny: {
            backgroundColor: tema ? primary_color(true) : "#e1dee3",
            padding: 10,
            borderRadius: 40,
            margin: 10,
            borderColor: tema ? "red" : tertiary_color(false),
        },
        confirmText: {
            color: tertiary_color(tema),
            textAlign: "center",
            fontSize: 20,
        },
        denyText: {
            textAlign: "center",
            fontSize: 20,
            color: tertiary_color(tema),
        },
        button: {
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            borderWidth: 1,
        },
        errorMessage: {
            color: "red",
            textAlign: "center",
            fontSize: 20,
            backgroundColor: tema ? primary_color(true) : "#fdd",
            paddingTop: 3,
            margin: 'auto',
            marginTop: 20,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: tema ? "red" : "transparent",
            marginBottom: 15,
            paddingHorizontal: 15
        },
        diary: {
            width: "75%",
            padding: 0,
            borderWidth: 2,
            borderColor: secondary_color,
            borderRadius: 10,
            margin: "auto",
            fontSize: 20,
        },
        container: {
            backgroundColor: primary_color(tema),
        },
        box: orientamento === 'portrait' ? {} : {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalView: {
            margin: 'auto',
            backgroundColor: primary_color(tema),
            borderRadius: 20,
            borderWidth: 2,
            borderColor: secondary_color,
            width: '90%',
            padding: 15,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        calendarContainer: {
            marginTop: 20,
            margin: 'auto'
        },
        dataora: {
            textAlign: 'center',
            borderRadius: 10,
            borderWidth: 2,
            padding: 10,
            fontSize: 20,
            borderColor: secondary_color,
        }
    })



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
        if (voto == "" && data < d) {
            setErr("Inserisci una data futura per un esame non ancora sostenuto")
            return
        }

        if (voto == '' && !(voto && !isNaN(voto) && voto > 17 && voto < 31) && data < d) {
            setErr("Inserisci un voto tra 18 e 30")
            return
        }


        if (Object.keys(db).length === 0) { // Se il database è stato inizializzato
            setErr("Errore interno")
            return
        }

        (db as SQLite.SQLiteDatabase).transaction((tx) => {
            tx.executeSql('insert into esame (nome, corso, cfu, tipologia, docente, voto, lode, data, ora, luogo, diario) values (?,?,?,?,?,?,?,?,?,?,?)',
                [nome, corso, cfu, tipologia, docente, voto, lode, data.toLocaleDateString(), data.toLocaleTimeString(), luogo, diario], (_: any, res: any) => {
                    navigation.goBack()
                }, (err: any) => {
                    setErr("Esame già presente o dati errati")
                })

        })
    }

    return (
        <View style={{ backgroundColor: primary_color(tema) }}>
            <Header scuro={tema} title="Inserisci esame" />
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

                <View style={style.calendarContainer}>
                    <TouchableOpacity onPress={()=>setOpenCalendar(true)}>
                        <Text style={style.dataora}>INSERISCI DATA & ORA</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={openCalendar}
                    onRequestClose={() => setOpenCalendar(false)}
                >
                    <Pressable onPress={() => setOpenCalendar(false)} style={style.centeredView} android_disableSound={true} android_ripple={{ color: 'transparent' }}>
                        <Pressable style={style.modalView} onPress={(e) => e.preventDefault()} android_disableSound={true} android_ripple={{ color: 'transparent' }}>
                            <DatePicker
                                mode='calendar'
                                selected={data.toString()}
                                onDateChange={()=>{setOpenCalendar(false);setOpenClock(true)}}
                                options={{
                                    backgroundColor: primary_color(tema),
                                    textHeaderColor: secondary_color,
                                    mainColor: secondary_color,
                                    borderColor: secondary_color,
                                    textDefaultColor: tertiary_color(tema),
                                    textSecondaryColor: secondary_color,
                                }}
                            />
                        </Pressable>
                    </Pressable>
                </Modal>
                {openClock ?
                    <TimePicker
                        mode='time'
                        value={ora}
                        minuteInterval={5}
                        onChange={(_, selectedDate) => {(selectedDate?setOra(selectedDate):null);setOpenClock(false)}}
                        onError={()=>setOpenClock(false)}
                    /> : null
                }
                <Text style={[style.text, { marginTop: "10%", marginBottom: orientamento === 'portrait' ? "10%" : "5%" }]} >DIARIO</Text>
                <TextInput style={style.diary} numberOfLines={3} multiline={true} value={diario} onChangeText={setDiario} />
                <View style={style.buttons}>
                    <TouchableOpacity onPress={submit} style={[style.confirm, style.button, {width: "33%"}]}>
                        <Text style={style.confirmText}>Conferma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[style.deny, style.button,{width: "33%"}]}>
                        <Text style={style.denyText}>Annulla</Text>
                    </TouchableOpacity>
                </View>
                {err ? <Text style={style.errorMessage}>{err}</Text> : null}
                <View style={{ height: "10%" }} />
            </ScrollView>
        </View>
    )
}




export default Esame;