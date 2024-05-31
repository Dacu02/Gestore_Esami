import React, { useEffect, createContext, useState, useContext } from 'react'
import { primary_color, secondary_color, tertiary_color } from '../global'
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView, Switch, Dimensions, Modal, Pressable, BackHandler } from 'react-native'
import { ImageBackground } from 'react-native';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import TimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Campo from './Campo'
import { DataBaseContext } from './DataBase'
import SQLite from 'react-native-sqlite-storage'
import { Checkbox } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus,faBook,faUser, faPenNib, faSquarePollVertical,faUsers, faFilter, faUserTie, faLocationDot, faList} from '@fortawesome/free-solid-svg-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import  { MultiSelect }  from 'react-native-element-dropdown'
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import Slider from '@react-native-community/slider'


import { Platform } from 'react-native'



const Input = ({ navigation }: any) => {

    const [openCalendar, setOpenCalendar] = useState(false)
    const [openClock, setOpenClock] = useState(false)

    const [nome, setNome] = useState("")
    const [corso, setCorso] = useState("")
    const [voto, setVoto] = useState("")
    const [lode, setLode] = useState(false)
    const [cfu, setCfu] = useState("")
    const [tipologia, setTipologia] = useState("")
    const [listaCategorie, setListaCategorie] = useState<string[]>([])
    const [categorieNuove, setCategorieNuove] = useState<string[]>([])
    const [categoria, setCategoria] = useState<string[]>([])
    const [docente, setDocente] = useState("")
    const [luogo, setLuogo] = useState("")
    const [diario, setDiario] = useState("")
    const [err, setErr] = useState("")
    const [data, setData] = useState(new Date())
    const [dataoraInputted, setDataoraInputted] = useState(false)
    const [modalCategory, setModalCategory] = useState(false)
    const [creaCategoria, setCreaCategoria] = useState("")
    const [color, setColor] = useState('#000000')
    
    const getTema = async () =>
        (await AsyncStorage.getItem('tema') === 'dark')

    const [tema, setTema] = useState(true)

    useEffect(() => {
        getTema().then(value => setTema(value))

        ;(db as SQLite.SQLiteDatabase).transaction((tx) => {
            let temp: string[] = []
            tx.executeSql('select nome from categoria', [], (_, res) => {
                for (let i = 0; i < res.rows.length; i++)
                    temp.push(res.rows.item(i).nome)
            })
            setListaCategorie(temp)
        })
    }, [])

    const timeInput = (v: Date|undefined) => {
        if (v) {
            setData(v)
            setDataoraInputted(true)
        } 
        setOpenClock(false)
    }


    const formatData = (d: String) => {
        const [yyyy, mm, dd] = d.split('/')
        setData(new Date(parseInt(yyyy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10)))
    }

    const db = useContext(DataBaseContext)

    const submit = () => {
        setErr('')
        if(nome === '') {
            setErr('Nome non può essere vuoto')
            return
        }
        if (corso === '') {
            setErr('Corso non può essere vuoto')
            return
        }
        if (cfu === '') {
            setErr('CFU non può essere vuoto')
            return
        }
        if (parseInt(cfu, 10) < 1) {
            setErr('CFU deve essere maggiore di 0')
            return
        }
        if (tipologia === '') {
            setErr('Tipologia non può essere vuota')
            return
        }
        if (docente === '') {
            setErr('Docente non può essere vuoto')
            return
        }

        if (dataoraInputted === false) {
            setErr('Data e ora non possono essere vuoti')
            return
        }

        categorieNuove.forEach((v) => {
            if (categoria.includes(v)){
                (db as SQLite.SQLiteDatabase).transaction((tx) => {
                    console.log("Nuova cat:", v)
                    tx.executeSql('insert into categoria (nome, colore) values (?, ?)', [v, '#000000'], (tx, res) => {
                        console.log('Categoria inserita correttamente')
                        console.log(res)
                    }, (tx, err) => {
                        console.error('Errore insert categoria: ', err)
                    })
                })
            }
        })

        ;(db as SQLite.SQLiteDatabase).transaction((tx) => {
            let v, lg, ld, dr
            if (voto === '' || parseInt(voto, 10) < 18 || parseInt(voto, 10) > 30) {
                    v = null
                    ld = null
            }
            else {
                v = parseInt(voto, 10)
                ld = lode
            }

            if (luogo === '') 
                lg = null
            else
                lg = luogo
            
            if (diario === '')
                dr = null
            else
                dr = diario
                
            console.log('nome:', nome.trim(), '\ncorso:',corso.trim(), '\ncfu', cfu, '\ntipoolgia:', tipologia, '\ndocente:', docente.trim(), '\nvoto:', v, '\nlode:', ld, '\ndata:', getFormatedDate(data, 'YYYY/MM/DD'), '\nora:', getFormatedDate(data, 'HH:mm'), '\nluogo:', lg?lg.trim():lg, '\ndiario:', dr?dr.trim():dr)
            tx.executeSql('insert into esame (nome, corso, cfu, tipologia, docente, voto, lode, data, ora, luogo, diario) values (?,?,?,?,?,?,?,?,?,?,?)', [nome, corso, cfu, tipologia, docente, v, ld, getFormatedDate(data, 'YYYY/MM/DD'), getFormatedDate(data, 'HH:mm'), lg, diario], (tx, res) => {
                console.log('Valore inserito correttamente')
                console.log(res)
            }, (tx, err) => {
                console.error('Errore insert esame: ', err)
            })

            categoria.forEach((cat) => {
                tx.executeSql('insert into appartiene (nomeEsame, nomeCategoria) values (?, ?)', [nome, cat], (tx, res) => {
                    console.log('Categoria inserita correttamente')
                    console.log(res)
                }, (tx, err) => {
                    console.error('Errore insert appartiene: ', err)
                })
            })
        })


    }


    const onCreaCategoria = () => {
        setModalCategory(false) 
        setCreaCategoria("")
        if (creaCategoria !== '' && !listaCategorie.includes(creaCategoria) && !categorieNuove.includes(creaCategoria)) 
            setCategorieNuove([...categorieNuove, creaCategoria])
    }

    const getPlaceHolder = () => {
        if (categoria.length === 0)
            return 'Seleziona categoria'
        let str = categoria[0]
        for(let i = 1; i < categoria.length; i++) 
            str += ', ' + categoria[i]
        return str
    }

    console.log(categoria)

    return (
<>
        <View style={style.header}>
        <Text style={style.listHeadline}>Nuovo Esame</Text>
    </View>
   
        <ScrollView style={style.ex}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalCategory}
                onRequestClose={() => {setModalCategory(false), setCreaCategoria("")}}
            >
                <Pressable android_disableSound={true} android_ripple={{ color: primary_color(tema)+'d0' }} onPress={()=>{setModalCategory(false); setCreaCategoria("")}} style={[style.modal, {backgroundColor: primary_color(tema)+'d0'}]}>
                    <Pressable onPress={(e) => e.preventDefault()} style={[style.modalView, {backgroundColor: primary_color(tema)}]} android_disableSound={true} android_ripple={{ color: primary_color(tema) }} >
                        <Text>Inserisci una categoria</Text>
                        <TextInput 
                            value={creaCategoria} 
                            onChangeText={setCreaCategoria} 
                            style={[style.categoria, {backgroundColor: primary_color(!tema)+'22'}]} 
                            placeholderTextColor={primary_color(!tema)+'dd'} 
                            placeholder='Nome categoria' />
                        <ColorPicker
                            onColorChange={(hsv)=>setColor(fromHsv(hsv).toString())}
                            //TODO sliderComponent={<Slider /> }
                        />
                        <TouchableOpacity style={style.confirm} onPress={onCreaCategoria}>
                            <Text style={style.confirmText}>Conferma</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
            <ImageBackground style={style.image} source={tema ? require('../immaginiEsami/OndaBlack2.png') : require('../immaginiEsami/Onda2.png')}>
                <View style={style.container}>
                    <Campo tema={tema} nome='Nome' value={nome} onChange={setNome} icon={faUser}/>
                    <Campo tema={tema} nome='Corso' value={corso} onChange={setCorso} icon={faUsers}/>
                    <Campo tema={tema} nome='Voto' value={voto} onChange={setVoto} icon={faPenNib} tipo='numeric' />
                    <Campo tema={tema} nome='CFU' value={cfu} onChange={setCfu} icon={faSquarePollVertical} tipo='numeric' />
                    {/* //TODO selettore tipologia orale, scritto, scritto e orale */}

                    <View style={style.selectRow}>
                        <View style= {style.dir}>
                        <FontAwesomeIcon
                                icon={faFilter}
                                size={16}
                                style={{...style.icona, color: primary_color(tema)}}
                                />
                        <Text style={[style.selectText, {color: primary_color(tema)}]}>TIPOLOGIA</Text>
                        </View>
                        <View style={style.innerRow}>
                            <SelectList 
                                boxStyles={ {borderWidth: 0, backgroundColor: primary_color(tema),width:'100%'}} 
                                placeholder='Seleziona tipologia' 
                                inputStyles={{...style.selectInput, color: tipologia !== '' ? tertiary_color(tema) : tertiary_color(tema)+'80'}} 
                                dropdownStyles={{...style.selectDrop, backgroundColor: primary_color(tema), borderWidth: 0}} 
                                setSelected={setTipologia} 
                                data={['orale', 'scritto', 'scritto e orale']} 
                                search={false}  
                                save='value' />
                        </View>
                    </View>
                    <View style={style.selectRow}>
                        <View style={style.dir}>
                        <FontAwesomeIcon
                            icon={faList}
                            size={16}
                            style={{...style.icona, color: primary_color(tema)}}
                            />
                        <Text style={[style.selectText, {color: primary_color(tema)}]}>CATEGORIA</Text>
                        </View>
                        <View style={style.innerRow}>
                            {/* <MultipleSelectList
                                boxStyles={{backgroundColor: primary_color(tema), maxWidth:'86%', minWidth: '86%', borderWidth:0}} 
                                placeholder='Seleziona categoria'
                                inputStyles={{...style.selectInput, color: categoria.length !== 0 ? tertiary_color(tema) : tertiary_color(tema)+'80' }} 
                                dropdownStyles={{...style.selectDrop, borderWidth: 0, backgroundColor: primary_color(tema)}} 
                                setSelected={(v:any) => v?setCategoria(v):null} 
                                data={[...listaCategorie, ...categorieNuove]} 
                                save='value' 
                                search={false}
                                checkBoxStyles={{backgroundColor: primary_color(!tema)+'a0'}}
                                badgeStyles={{display: 'none'}}
                                dropdownTextStyles={{color: tertiary_color(tema)}}

                                notFoundText='Nessuna categoria esistente'
                                labelStyles={{display: 'none'}}
                                maxHeight={120}
                            /> */}
                            <MultiSelect
                                selectedTextStyle={{color: tertiary_color(tema)}}
                                mode='auto'
                                search={false}
                                // data={[...listaCategorie, ...categorieNuove, ]} 
                                data={[...listaCategorie, ...categorieNuove, 'a', 'b', 'c', 'd', 'e'].map((v) => ({value: v}))}
                                placeholder={getPlaceHolder()}
                                labelField={'value'}
                                valueField={'value'}
                                value={categoria}
                                key={'value'}
                                style={{backgroundColor: primary_color(tema), width: '80%', paddingLeft: 20, borderRadius: 10, marginRight: '7.5%'}}
                                itemTextStyle={{color: tertiary_color(tema)}}
                                placeholderStyle={{color: tertiary_color(tema)+'80'}}
                                onChange={setCategoria}
                                containerStyle={{backgroundColor: primary_color(tema), borderRadius: 10, borderWidth: 0}}
                                itemContainerStyle={{backgroundColor: primary_color(tema), borderColor: secondary_color}}
                                selectedStyle={{display: 'none'}}
                                activeColor={secondary_color+'bb'}
                                renderItem={(item, set) => (
                                    <Text style={style.selectItem}>{item.value}</Text>
                                )}
                            />
                            <View>
                                {}
                            </View>
                                <TouchableOpacity style={[style.plusIcon, {backgroundColor: primary_color(tema)}]} onPress={()=>setModalCategory(true)}>
                                      <FontAwesomeIcon
                                         icon={faPlus}
                                         color={tertiary_color(tema)}
                                         size={20}
                                      />
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    <Campo tema={tema} nome='Docente' value={docente} onChange={setDocente} icon={faUserTie} />
                    <Campo tema={tema} nome='Luogo' value={luogo} onChange={setLuogo} icon={faLocationDot}/>

                    <Campo tema={tema} nome='Diario' value={diario} onChange={setDiario} icon={faBook}/>


                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={openCalendar}
                        onRequestClose={() => setOpenCalendar(false)}
                    >
                        <Pressable onPress={() => setOpenCalendar(false)} style={[style.centeredView, {backgroundColor: primary_color(tema)+'d0'}]} android_disableSound={true} android_ripple={{ color: primary_color(tema)+'80' }}>
                            <Pressable style={[style.modalView, {backgroundColor: primary_color(tema)}]} onPress={(e) => e.preventDefault()} android_disableSound={true} android_ripple={{ color: primary_color(tema) }}>
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
                    <View style={style.containerOra}>
                    {openClock ?
                 
                        <TimePicker
                            mode='time'
                            value={data}
                            onChange={(_, selectedDate) => timeInput(selectedDate)}
                            onError={() => setOpenClock(false)}
                            style={style.ora}
                        /> 
                        : null
                        
                    }
                    </View>
                    <View style={style.calendarContainer}>
                        <TouchableOpacity onPress={() => setOpenCalendar(true)}>
                            <Text style={[style.dataora, {backgroundColor: primary_color(tema)}]}>
                                {!dataoraInputted ? 'Inserisci Data & Ora' : getFormatedDate(data, "DD/MM/YYYY HH:mm")}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={style.buttons}>
                        <TouchableOpacity style={style.confirm}>
                            <Text onPress={submit} style={style.confirmText}>CONFERMA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.deny]}>
                            <Text onPress={() => navigation.goBack()} style={style.denyText}>ANNULLA</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {err ? <Text style={style.errorMessage}>{err}</Text> : null}
            </ImageBackground>
        </ScrollView>
        </>
    )
}

const style = StyleSheet.create({
    containerOra:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ora:{
        backgroundColor: 'white',
        borderRadius: 5,      
    },
    image: {
        flex: 1,
    },
    icona:{
        marginRight:10,
    },
    modal: {
        margin: "auto",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
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
        backgroundColor: '#355181',
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
        flex: 1,
        
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
        margin: 'auto',
    },
    dataora: {
        textAlign: 'center',
        color: '#888',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },

 

    text: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 25
    },

    diary: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
        padding: 0,
        borderRadius: 15,
        margin: "auto",
        fontSize: 15,
        backgroundColor: 'white',
        ...Platform.select({
            ios:{
        padding:15
            }
        })
    },

    errorMessage: {
        color: "#CC3337",
        fontWeight: 'bold',
        textAlign: "center",
        paddingTop: 3,
        margin: 'auto',
        marginTop: 10,
        fontSize: 20,
        backgroundColor: 'transparent',
        borderColor: "red",
        marginBottom: 10,
        paddingHorizontal: 15
    },
    categoria: {
        width: '80%',
        height: 40,
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    selectRow: {
        width: '80%',
        marginBottom: 20,
    },
   
    selectInput: {
        width: '95%',
    },
    selectDrop: {
        width: '95%',
    },
    plusIcon: {
        height:20,
        width:20,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        padding:20

    },
    selectText: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    innerRow: {
        display: 'flex',
        flexDirection: 'row',
    },

    dir: {
        display: 'flex', 
        flexDirection: 'row'
    },
    selectItem: {
        padding: 10,
        margin: 5,
    }
})

export default Input