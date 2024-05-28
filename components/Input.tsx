import React, { useEffect, createContext, useState } from 'react';
import { primary_color, secondary_color, tertiary_color } from '../global'
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView, Switch, Dimensions, Modal, Pressable } from 'react-native'
import { ImageBackground } from 'react-native';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import TimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Campo from './Campo';



const Input = ({ navigation }: any) => {

    const [openCalendar, setOpenCalendar] = useState(false)
    const [openClock, setOpenClock] = useState(false)

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


    const temaStyle = StyleSheet.create({
        color: {
            color: tertiary_color(tema),
        },
        backgroundColor: {
            backgroundColor: primary_color(tema),
        },
        appColor: {
            color: secondary_color,
        }
    })

    const formatData = (d: String) => {
        const [yyyy, mm, dd] = d.split('/')
        setData(new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd), 2 )) //Todo sostituire 2 con fuso orario locale
    }

    const formatTime = (d: Date) => {
        setOra(d) //todo Errore di fuso orario, non setta la data
    }

    console.log(data)

    return (

        <ScrollView style={style.ex}>
            <View style={style.header}>
                <Text style={style.listHeadline}>Nuovo Esame</Text>
            </View>
            <ImageBackground style={style.image} source={require('../immaginiEsami/Onda2.png')}>
                <View style={style.container}>
                    <Campo tema={tema} nome='Nome' value={nome} onChange={setNome} />
                    <Campo tema={tema} nome='Corso' value={corso} onChange={setCorso} />
                    <Campo tema={tema} nome='Voto' value={voto} onChange={setVoto} tipo='numeric' />
                    <Campo tema={tema} nome='CFU' value={cfu} onChange={setCfu} tipo='numeric' />
                    <Campo tema={tema} nome='Tipologia' value={tipologia} onChange={setTipologia} />
                    <Campo tema={tema} nome='Docente' value={docente} onChange={setDocente} />
                    <Campo tema={tema} nome='Luogo' value={luogo} onChange={setLuogo} />
                    <View style={style.calendarContainer}>
                        <TouchableOpacity onPress={() => setOpenCalendar(true)}>
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
                                    selected={getFormatedDate(data, "YYYY/MM/DD")}
                                    onDateChange={(val) => {formatData(val); setOpenCalendar(false); setOpenClock(true); }}
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
                            minuteInterval={5}
                            value={data}
                            onChange={(_, selectedDate) => { (selectedDate ? formatTime(selectedDate) : null); setOpenClock(false) }}
                            onError={() => setOpenClock(false)}
                        /> : null
                    }

                    <View style={style.buttons}>
                        <TouchableOpacity style={style.confirm}>
                            <Text style={style.confirmText}>CONFERMA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.deny}>
                            <Text onPress={() => navigation.goBack()} style={style.denyText}>ANNULLA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const style = StyleSheet.create({

    image: {
        flex: 1,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10
    },




    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },

    confirm: {
        backgroundColor: 'green',
        borderRadius: 5,
        margin: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    deny: {
        backgroundColor: '#e1dee3',
        borderRadius: 5,
        margin: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    confirmText: {
        color: 'white',
        fontWeight: 'bold'
    },

    denyText: {
        color: 'black',
        fontWeight: 'bold'
    },

    ex: {
        flex: 1
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60
    },

    listHeadline: {
        color: '#333',
        fontSize: 22,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 'auto',
        borderRadius: 20,
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
        color: '#888',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})

export default Input;