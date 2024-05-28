import React, { useEffect, createContext, useState } from 'react';
import { primary_color, secondary_color, tertiary_color } from '../global'
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView, Switch, Dimensions, Modal, Pressable } from 'react-native'
import { ImageBackground } from 'react-native';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import TimePicker from '@react-native-community/datetimepicker'



const Input = ({navigation} : any) => {

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

    return(
        
        <ScrollView style = {style.ex}>
            <View style={style.header}>
                <Text style={style.listHeadline}>Nuovo Esame</Text>        
            </View>
        <ImageBackground style = {style.image} source = {require('../immaginiEsami/Onda2.png')}>
        <View style = {style.container}> 
            <View style = {style.row}>
                <Text style = {style.text}>NOME</Text>
                <TextInput placeholder= 'Inserisci Nome' placeholderTextColor="#888" style = {style.textinput} />
            </View>
            <View style = {style.row}>
                <Text style = {style.text}>CORSO</Text>
                <TextInput placeholder= 'Inserisci Corso' placeholderTextColor="#888" style = {style.textinput}/>            
            </View>
            <View style = {style.row}>
                <Text style = {style.text}>VOTO</Text>
                <TextInput placeholder= 'Inserisci Voto' placeholderTextColor="#888" keyboardType='numeric' style = {style.textinput}/>
            </View>
            <View style = {style.row}>
                <Text style = {style.text}>CFU</Text>
                <TextInput placeholder= 'Inserisci CFU' placeholderTextColor="#888" keyboardType='numeric' style = {style.textinput}/>
            </View>

            <View style = {style.row}>
                <Text style = {style.text}>TIPOLOGIA</Text>
                <TextInput placeholder= 'Inserisci Tipologia' placeholderTextColor="#888" style = {style.textinput}/>
            </View>

            <View style = {style.row}>
                <Text style = {style.text}>DOCENTE</Text>
                <TextInput placeholder= 'Inserisci Docente' placeholderTextColor="#888" style = {style.textinput}/>
            </View> 

            <View style = {style.row}>
                <Text style = {style.text}>LUOGO</Text>
                <TextInput placeholder= 'Inserisci Luogo' placeholderTextColor="#888" style = {style.textinput}/>
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
                                    textHeaderColor: secondary_color,
                                    mainColor: secondary_color,
                                    borderColor: secondary_color,
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

            <View style = {style.buttons}>
                <TouchableOpacity style = {style.confirm}>
                    <Text style = {style.confirmText}>CONFERMA</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {style.deny}>
                    <Text onPress={() => navigation.goBack()} style = {style.denyText}>ANNULLA</Text>
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

    row: {
        marginBottom: 20, 
        width: '80%' 
    },

    text: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10
    },

    textinput: {
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        height:60
    },

    listHeadline: {
        color: '#333',
        fontSize: 22,
        fontWeight: 'bold',
        flex:1,
        textAlign:'center',
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