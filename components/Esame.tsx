import React, { useEffect, useContext, useState } from "react"
import { Settings, StyleSheet, Text, View, TextInput, Modal, Dimensions, TouchableOpacity, Pressable, Switch } from "react-native"
import Footer from "./Footer"
import { primary_color, secondary_color, tertiary_color } from '../global'
import Header from "./Header"
import { faCalendarDays, faGear } from "@fortawesome/free-solid-svg-icons"
import { DataBase, DataBaseContext } from "./DataBase"
import SQLite from 'react-native-sqlite-storage'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SelectList } from "react-native-dropdown-select-list"
import Promemoria from "./Promemoria"




const setCalendar = () => {
    console.log("Calendario")
}


const Esame = ({ navigation }: any) => {


    const db = useContext(DataBaseContext)
    const [setting, setSetting] = useState(false)
    const [notifica, setNotifica] = useState('giorni')
    const [numNotifica, setNumNotifica] = useState('7')
    const [lista, setLista] = useState(['giorni', 'settimane', 'mesi'])

    const changeNotifica = (value: string) => {
        setNumNotifica(value)
        try {
            if (parseInt(value) === 1)
                setLista(['giorno', 'settimana', 'mese'])
            else
                setLista(['giorni', 'settimane', 'mesi'])
        } catch (err) {
            setLista(['giorni', 'settimane', 'mesi'])
        }
    }

    const chiudiSetting = () => {
        setSetting(false)
        if (parseInt(numNotifica) < 1 || parseInt(numNotifica) > 365) {
            AsyncStorage.getItem('notifica').then(value => setNumNotifica(value ? value : '7'))
            AsyncStorage.getItem('tipoNotifica').then(value => setNotifica(value ? value : 'giorni'))
        } else if (parseInt(numNotifica) >= 1 && parseInt(numNotifica) <= 365) {
            AsyncStorage.setItem('notifica', numNotifica)
            if (parseInt(numNotifica) === 1) {
                switch (notifica) {
                    case 'giorni':
                        setNotifica('giorno')
                        AsyncStorage.setItem('tipoNotifica', 'giorno')
                        break
                    case 'settimane':
                        setNotifica('settimana')
                        AsyncStorage.setItem('tipoNotifica', 'settimana')
                        break
                    case 'mesi':
                        setNotifica('mese')
                        AsyncStorage.setItem('tipoNotifica', 'mese')
                        break
                }
            }

        }

        let tempo:number

        if (notifica.startsWith('giorn'))
            tempo = parseInt(numNotifica)
        else if (notifica.startsWith('settiman'))
            tempo = parseInt(numNotifica)*7
        else
            tempo = parseInt(numNotifica)*31

    const current_date = new Date()
    const max_date = new Date()
    max_date.setDate(current_date.getDate() + tempo)

    console.log(current_date, max_date);

        (db as SQLite.SQLiteDatabase).transaction((tx)=> {
            tx.executeSql('select data from esame where data>=current_date order by data desc', [], (t, res)=>{
                for(let i = 0;i<res.rows.length;i++)
                    if(res.rows.item(i).data>=Date() && res.rows.item(i).data<=max_date)
                        console.log(res.rows.item(i).data)
            })
            tx.executeSql('select * from esame where data>=current_date and data<=(select current_date + '+tempo+') order by data desc limit 3', [], (_, res) => console.log(res), (_, err)=>console.error(err.code))
        })
    }

    

    const getTema = async () =>
        (await AsyncStorage.getItem('tema') === 'dark')

    const getNumNotifica = async () =>
        (await AsyncStorage.getItem('notifica'))

    const getTipoNotifica = async () =>
        (await AsyncStorage.getItem('tipoNotifica'))

    const [tema, setTema] = useState(true)

    useEffect(() => {
        getTema().then(value => setTema(value))

        getNumNotifica().then((v) => {
            if (v != null) {
                setNumNotifica(v)
                if (parseInt(v) === 1)
                    setLista(['giorno', 'settimana', 'mese'])
                else
                    setLista(['giorni', 'settimane', 'mesi'])
            } else {
                setNumNotifica('7')
                AsyncStorage.setItem('notifica', '7')
            }
        })

        getTipoNotifica().then((v) => {
            if (v != null) {
                setNotifica(v)
            } else {
                setNotifica('giorni')
                AsyncStorage.setItem('tipoNotifica', 'giorni')
            }
        })
    }, [])
    const getOrientamento = () => (
        (Dimensions.get("screen").width > Dimensions.get("screen").height) ?
            "landscape"
            :
            "portrait"
    )

    const [orientamento, setOrientamento] = useState(getOrientamento())

    const style = StyleSheet.create({
        promemoria: {
            backgroundColor: tema ? "#222" : "#ddd",
            padding: 10,
            margin: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: secondary_color,
            flex: orientamento == 'portrait' ? undefined : 1,
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
            color: tertiary_color(tema),
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
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: primary_color(tema),
            opacity: 0.90,
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: "bold",
            color: tertiary_color(tema),
            textAlign: "center",
        },
        viewPromemoria: {
            display: "flex",
            flexDirection: orientamento === 'portrait' ? "column" : "row",
        },
        modalView: {
            backgroundColor: 'primary_color(tema)',
            margin: "auto",
            padding: 20,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: secondary_color,
            opacity:5
        },
        modalRow: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10,
        },
        modalRowText: {
            color: tertiary_color(tema),
            fontSize: 16,
        },
        modalNumInput: {
            color: tertiary_color(tema),
            width: 50,
            textAlign: "center",
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: secondary_color,
        },
        textColor: {
            color: tertiary_color(tema),
        }

    })


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
        <View style={{ backgroundColor: primary_color(tema), minHeight: "100%" }}>
            <Modal transparent={true} visible={setting} animationType="fade" onRequestClose={chiudiSetting}>
                <Pressable android_disableSound={true} android_ripple={{ color: 'transparent' }} onPress={chiudiSetting} style={style.modal}>
                    <Pressable onPress={(e) => e.preventDefault()} style={style.modalView} android_disableSound={true} android_ripple={{ color: 'transparent' }} >
                        <Text style={style.modalTitle}>Impostazioni</Text>
                        <View style={style.modalRow} >
                            <Text style={style.modalRowText}>Tema:</Text>
                            <Switch thumbColor={secondary_color} value={tema} onValueChange={(v) => { setTema(v); AsyncStorage.setItem('tema', v ? 'dark' : 'light') }} trackColor={{ false: 'darkblue', true: 'lightyellow' }} />
                        </View>
                        <View style={style.modalRow}>
                            <Text style={style.modalRowText}>Notifica promemoria:</Text>
                            <TextInput style={style.modalNumInput} keyboardType="numeric" value={numNotifica} onChangeText={changeNotifica} />
                            <SelectList inputStyles={style.textColor} data={lista} search={false} placeholder={notifica} setSelected={setNotifica} />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
            <Header title="Lista esami" leftIcon={faGear} onPressLeft={() => setSetting(true)} rightIcon={faCalendarDays} onPressRight={setCalendar} scuro={tema} />

            <View style={style.viewPromemoria}>
                {testData.map((esame, index) => <Promemoria key={index} {...esame} style={style} />)}
            </View>
            <Footer navigation={navigation} scuro={tema} />
        </View>
    )
}

export default Esame