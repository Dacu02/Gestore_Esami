import React, { useEffect, useContext, useState } from "react"
import { Settings, StyleSheet, Text, View, TextInput, Modal, Dimensions, TouchableOpacity, Pressable, Switch } from "react-native"
import Footer from "../Footer"
import { primary_color, rapportoOrizzontale, secondary_color, tertiary_color, getOrientamento } from '../../global'
import Header from "../Header"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { DataBase, DataBaseContext } from "../DataBase"
import SQLite from 'react-native-sqlite-storage'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SelectList } from "react-native-dropdown-select-list"
import Promemoria from "../Promemoria"
import { getFormatedDate } from "react-native-modern-datepicker"
import { rapportoVerticale, scala } from "../../global"


const Home = ({ navigation }: any) => {

    interface Notifica {
        nome: string,
        corso:string,
        tipologia:string,
        cfu: number,
        data: string,
        docente:string | null,
        ora: string | null,
        luogo:string,
    }


    const db = useContext(DataBaseContext)
    const [setting, setSetting] = useState(false)
    const [notifica, setNotifica] = useState('giorni')
    const [numNotifica, setNumNotifica] = useState('7')
    const [lista, setLista] = useState(['giorni', 'settimane', 'mesi'])
    const [notifiche, setNotifiche] = useState<Notifica[]>([])

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
        });
    }, [])

    const aggiornaPromemoria = () => {
        
        let tempo:number
        if (notifica.startsWith('giorn'))
            tempo = parseInt(numNotifica)
        else if (notifica.startsWith('settiman'))
            tempo = parseInt(numNotifica)*7
        else
            tempo = parseInt(numNotifica)*31

        const dataMax = new Date()
        dataMax.setDate(dataMax.getDate() + tempo)
        
        
        ;(db as SQLite.SQLiteDatabase).transaction((tx) => {
            const proms: Notifica[] = []
            tx.executeSql("SELECT * FROM esame WHERE voto IS NULL AND data>='" + getFormatedDate(new Date(), 'YYYY/MM/DD') +"' AND data<'" + getFormatedDate(dataMax, 'YYYY/MM/DD') +"' ORDER BY data DESC LIMIT 3", [], (tx, res) => {
                for(let i = 0; i < res.rows.length; i++){
                    const dati = {
                        nome: res.rows.item(i).nome,
                        corso: res.rows.item(i).corso,
                        cfu: res.rows.item(i).cfu,
                        tipologia: res.rows.item(i).tipologia,
                        docente: res.rows.item(i).docente,
                        ora: res.rows.item(i).ora,
                        data: res.rows.item(i).data,
                        luogo: res.rows.item(i).luogo,
                    }
                    proms.push(dati)
                }
                setNotifiche(proms)
            })
        })
    }

    useEffect(() => {
        if (Object.keys(db).length > 0) // se il db è stato inizializzato
            aggiornaPromemoria()
    }, [db, numNotifica, notifica])

    const [orientamento, setOrientamento] = useState(getOrientamento())

    Dimensions.addEventListener("change", () => setOrientamento(getOrientamento()))

    return (
        <View style={{ backgroundColor: primary_color(tema), minHeight: "100%" }}>
            <Modal transparent={true} visible={setting} animationType="fade" onRequestClose={chiudiSetting}>
                <Pressable android_disableSound={true} android_ripple={{ color: primary_color(tema)+'d0' }} onPress={chiudiSetting} style={[style.modal, {backgroundColor: primary_color(tema)+'d0'}]}>
                    <Pressable onPress={(e) => e.preventDefault()} style={[style.modalView, {backgroundColor: primary_color(tema)}]} android_disableSound={true} android_ripple={{ color: primary_color(tema) }} >
                        <Text style={[style.modalTitle, {color: tertiary_color(tema)}]}>Impostazioni</Text>
                        <View style={style.modalRow} >
                            <Text style={[style.modalRowText, {color: tertiary_color(tema)}]}>Tema:</Text>
                            <Switch thumbColor={secondary_color} value={tema} onValueChange={(v) => { setTema(v); AsyncStorage.setItem('tema', v ? 'dark' : 'light') }} trackColor={{ false: 'darkblue', true: 'lightyellow' }} />
                        </View>
                        <View style={style.modalRow}>
                            <Text style={[style.modalRowText, {color: tertiary_color(tema)}]}>Notifica promemoria:</Text>
                            <TextInput style={[style.modalNumInput, {color: tertiary_color(tema)}]} keyboardType="numeric" value={numNotifica} onChangeText={changeNotifica} />
                            <SelectList inputStyles={{color: tertiary_color(tema)}} data={lista} search={false} placeholder={notifica} setSelected={setNotifica} />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
            <Header icon={true} title="Promemoria" leftIcon={faGear} onPressLeft={() => setSetting(true)} scuro={tema} />
            <View style={[style.viewPromemoria, {flexDirection: orientamento === 'portrait' ? "column" : "row",}]}>
                {notifiche.map((esame, index) => <Promemoria key={index} {...esame} style={style} />)}
            </View>
            <Footer navigation={navigation} scuro={tema} />
        </View>
    )
}

const style = StyleSheet.create({
    modal: {
        margin: "auto",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    viewPromemoria: {
        display: "flex",
    },
    modalView: {
        margin: "auto",
        padding: rapportoOrizzontale(20),
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
        marginTop: rapportoVerticale(10),
        marginBottom: rapportoVerticale(10),
    },
    modalRowText: {
        fontSize: 16,
    },
    modalNumInput: {
        width: 50,
        textAlign: "center",
        marginLeft: rapportoOrizzontale(5),
        marginRight: rapportoOrizzontale(5),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: secondary_color,
    },

})

export default Home