import React, { useContext, useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, Text, Image, View, TouchableOpacity, Modal, Pressable, FlatList, ScrollView } from "react-native"
import { DataBaseContext } from "../DataBase"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCalendarDay, faCalendarDays, faCalendarWeek, faPencil, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { primary_color, secondary_color, tertiary_color } from "../../global"
import SQLite from 'react-native-sqlite-storage'
import { getFormatedDate } from "react-native-modern-datepicker"
import Header from "../Header"
import { getOrientamento, rapportoOrizzontale, rapportoVerticale, scala } from "../../global"
import Settimana from "./Settimana"
import Lista from "./Lista"
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from "react-native-calendars/src/types"
import Esame from "./Esame"

    interface EsameItem {
        nome: string,
        corso: string,
        tipologia: string,
        image: any,
        voto: string | null,
        CFU: number,
        data: Date,
        profEsame: string | null,
        ora: string,
        luogo: string,
        diario: string | null,
        lode: boolean,
        categoria: string[]
    }
    LocaleConfig.locales.it = {
        monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
        dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
    };
    
    LocaleConfig.defaultLocale = 'it'
    
    
    
const ListaEsami = ({ navigation }: any) => {


    

    const [esame, setEsame] = useState<EsameItem[]>([])

    const db = useContext(DataBaseContext) as SQLite.SQLiteDatabase
    const [modalVisible, setModalVisible] = useState("");
    const [visualizzazione, setVisualizzazione] = useState('giornaliero')
    const [icona, setIcona] = useState(faCalendarDay)
    const [dayPressed, setDayPressed] = useState<EsameItem[]>([])

    const updateVisualizzazione = () => {
        switch (visualizzazione) {
            case 'giornaliero':
                setIcona(faCalendarWeek)
                setVisualizzazione('settimanale')
                console.log(esamiPerSettimana())
                break
            case 'settimanale':
                setIcona(faCalendarDays)
                setVisualizzazione('mensile')
                break
            case 'mensile':
                setIcona(faCalendarDay)
                setVisualizzazione('giornaliero')
                break
        }
    }

    const loadData = () => {
        const dati: EsameItem[] = [];
        db.transaction((tx)=>tx.executeSql('select * from esame order by data desc', [], (t, results) => {
            for (let i = 0; i < results.rows.length; i++) {
                const dd = results.rows.item(i).data.split('/')[2]
                const mm = results.rows.item(i).data.split('/')[1] - 1  
                const yyyy = results.rows.item(i).data.split('/')[0]
                const esame = {
                    nome: results.rows.item(i).nome,
                    corso: results.rows.item(i).corso,
                    tipologia: results.rows.item(i).tipologia,
                    voto: results.rows.item(i).voto,
                    lode: results.rows.item(i).lode,
                    CFU: results.rows.item(i).cfu,
                    data: new Date(yyyy, mm, dd),
                    categoria: [] as string[],
                    profEsame: results.rows.item(i).docente,
                    ora: results.rows.item(i).ora,
                    luogo: results.rows.item(i).luogo,
                    diario: results.rows.item(i).diario,
                    image: results.rows.item(i).data <= getFormatedDate(new Date(), 'YYYY/MM/DD') && results.rows.item(i).voto ? require('../../immaginiEsami/Esame.png') : require('../../immaginiEsami/EsameInAttesa.png')
                }
                t.executeSql('select categoria from appartiene where esame = ?', [results.rows.item(i).nome], (_, res) => {
                    for (let j = 0; j < res.rows.length; j++) 
                        esame.categoria.push(res.rows.item(j).categoria)
                    dati.push(esame);
                })
            }
            setEsame(dati)
        }));
    }

    const getTema = async () =>
        (await AsyncStorage.getItem('tema') === 'dark')

    const [tema, setTema] = useState(true)

    useEffect(() => {
        loadData()
        getTema().then(value => setTema(value))
    }, [])


    const deleteEsame = async (nome: String) => {
        await db.executeSql('delete from appartiene where esame = ?', [nome])
        await db.executeSql('delete from esame where nome = ?', [nome])
        await db.executeSql('delete from categoria where nome not in (select categoria from appartiene)')
        setEsame(esame.filter(e => e.nome !== nome))
    }

    const esamiPerSettimana = () => {
        // restituisce la settimana minima e la settimana massima
        // in cui ci sono esami relativamente alla setttimana corrente
        if(esame.length === 0) return 0
        const oggi = new Date()
        const inizio = new Date()
        let i=0
        while(true) {
            if(inizio <= new Date(esame[esame.length-1].data)){
                break
            }
            i++
            inizio.setTime(oggi.getTime() - 7 * i * 24 * 60 * 60 * 1000); // i settimane in ms
        }
        const m = -i
        i = 0
        inizio.setTime(oggi.getTime())
        while(true) {
            if(inizio > new Date(esame[0].data)){
                break
            }
            i++
            inizio.setTime(oggi.getTime() + 7 * i * 24 * 60 * 60 * 1000); // i settimane in ms
        }
        const M = i
        return [m, M]
    }


    const header = <Header
        title="Lista Esami"
        leftIcon={faArrowLeft}
        onPressLeft={() => navigation.goBack()}
        scuro={tema}
        rightIcon={icona}
        onPressRight={updateVisualizzazione} />

    switch (visualizzazione) {
        case 'giornaliero':
            return (
                <View style={{ backgroundColor: primary_color(tema), height: '100%' }}>
                    {header}
                    <Lista
                        esami={esame}
                        tema={tema}
                        setModalVisible={setModalVisible}
                        delete={deleteEsame}
                        modalVisible={modalVisible}
                        naviga={(esame:string)=>navigation.navigate('ModificaEsame', {esame: esame})}
                    />
                </View>
            );
        case 'settimanale':
            const settimane: any[] = [];
            const [m, M] = esamiPerSettimana() || [0, 0]
            const oggi = new Date()
            const inizio = new Date()
            const fine = new Date()
            for (let i = M; i >= m; i--) {
                inizio.setTime(oggi.getTime() + 7 * (i-1) * 24 * 60 * 60 * 1000)
                fine.setTime(oggi.getTime() + 7 * (i) * 24 * 60 * 60 * 1000)
                settimane.push(
                    <Settimana 
                        inizio={getFormatedDate(inizio, 'DD/MM/YYYY')} 
                        fine={getFormatedDate(fine, 'DD/MM/YYYY')} 
                        esami={esame.filter((e)=> inizio<= e.data && e.data < fine)}
                        tema={tema}
                        setModalVisible={setModalVisible}
                        delete={deleteEsame}
                        modalVisible={modalVisible}
                        naviga={(esame:string)=>navigation.navigate('ModificaEsame', {esame: esame})}
                    />
                )
            }
            return (
                <View style={{ backgroundColor: primary_color(tema), height: '100%' }}>
                    {header}
                    <FlatList
                        data={settimane}
                        renderItem={({ item }) => item}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )
        case 'mensile':
            const date:MarkedDates = {}
            esame.forEach(e => {
                const data = getFormatedDate(e.data, 'YYYY-MM-DD')
                date[data] = {selected: true, selectedColor: e.voto ? "#019d3a" : "#f0b904"}
            })
            return (
                <View style={{ backgroundColor: primary_color(tema), height: '100%' }}>
                    {header}
                    <Calendar
                        theme={{
                            dayTextColor: tertiary_color(tema),
                            todayTextColor: secondary_color,
                            monthTextColor: tertiary_color(tema),
                            calendarBackground: primary_color(tema),
                        }}
                        markedDates={date}
                        hideExtraDays={true}
                        onDayPress={(day) => setDayPressed(esame.filter(e => getFormatedDate(e.data, 'YYYY-MM-DD') === day.dateString))}
                    />
                    {dayPressed.length!==0 ? 
                    <Lista
                        esami={dayPressed}
                        tema={tema}
                        setModalVisible={setModalVisible}
                        delete={(esame)=>{deleteEsame(esame); dayPressed.splice(dayPressed.findIndex(e => e.nome === esame), 1)}}
                        modalVisible={modalVisible}
                        naviga={(esame:string)=>navigation.navigate('ModificaEsame', {esame: esame})}
                    />
                    : null}
                </View>
            )
        default:
            return null
    }


}

export default ListaEsami