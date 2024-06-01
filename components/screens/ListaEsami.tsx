import React, { useContext, useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, Text, Image, View, TouchableOpacity, Modal, Pressable } from "react-native"
import { DataBaseContext } from "../DataBase"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCalendarDay, faCalendarDays, faCalendarWeek, faPencil, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { primary_color, secondary_color, tertiary_color } from "../../global"
import SQLite from 'react-native-sqlite-storage'
import { getFormatedDate } from "react-native-modern-datepicker"
import Header from "../Header"
import { getOrientamento, rapportoOrizzontale, rapportoVerticale, scala } from "../../global"
import {SwipeListView} from 'react-native-swipe-list-view'

const ListaEsami = ({ navigation }: any) => {

    interface EsameItem {
        nome: string,
        corso: string,
        tipologia: string,
        image: any,
        voto: string | null,
        CFU: number,
        data: string
        profEsame: string | null,
        ora: string,
        luogo: string,
        diario: string | null,
        lode: boolean,
        categoria: string[]
    }

    const [esame, setEsame] = useState<EsameItem[]>([])

    const db = useContext(DataBaseContext);
    const [modalVisible, setModalVisible] = useState("");
    const [visualizzazione, setVisualizzazione] = useState('giornaliero')
    const [icona, setIcona] = useState(faCalendarWeek)

    const updateVisualizzazione = () => {
        switch (visualizzazione) {
            case 'giornaliero':
                setIcona(faCalendarWeek)
                setVisualizzazione('settimanale')
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
        (db as SQLite.SQLiteDatabase).transaction((tx) => {
            tx.executeSql('select * from esame', [], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    const esame = {
                        nome: results.rows.item(i).nome,
                        corso: results.rows.item(i).corso,
                        tipologia: results.rows.item(i).tipologia,
                        voto: results.rows.item(i).voto,
                        lode: results.rows.item(i).lode,
                        CFU: results.rows.item(i).cfu,
                        data: results.rows.item(i).data.split('/').reverse().join('/'),
                        categoria: [''],
                        profEsame: results.rows.item(i).docente,
                        ora: results.rows.item(i).ora,
                        luogo: results.rows.item(i).luogo,
                        diario: results.rows.item(i).diario,
                        image: results.rows.item(i).data <= getFormatedDate(new Date(), 'YYYY/MM/DD') && results.rows.item(i).voto ? require('../../immaginiEsami/Esame.png') : require('../../immaginiEsami/EsameInAttesa.png')
                    }
                    esame.categoria.pop()
                    tx.executeSql('select categoria from appartiene where esame = ?', [results.rows.item(i).nome], (tx, res) => {
                        for (let j = 0; j < res.rows.length; j++) {
                            esame.categoria.push(res.rows.item(j).categoria)
                        }
                        dati.push(esame);
                    })
                }
            });
            setEsame(dati);
        });
    }
    const getTema = async () =>
        (await AsyncStorage.getItem('tema') === 'dark')

    const [tema, setTema] = useState(true)

    useEffect(() => {
        loadData()
        getTema().then(value => setTema(value))
    }, [])


    const deleteEsame = (nome:String) => {
        (db as SQLite.SQLiteDatabase).transaction((tx) => {
            tx.executeSql('delete from appartiene where esame = ?', [nome])
            tx.executeSql('delete from esame where nome = ?', [nome])
            tx.executeSql('delete from categoria where nome not in (select categoria from appartiene)')
        }
    )
    setEsame(esame.filter(e => e.nome !== nome))
} 


    const Bottoni = (props:any) => (
        <View style={style.bottoniContainer}>
        <TouchableOpacity style={style.eliminaContainer} onPress={()=>deleteEsame(props.esame)} >
            <FontAwesomeIcon icon={faTrashCan} style={style.elimina} size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ModificaEsame', { esame: props.esame })} style={style.modificaContainer}>
            <FontAwesomeIcon icon={faPencil} style={style.modifica} size={30} />
        </TouchableOpacity>
        </View>
    )

    style.details = {
        ...style.details,
        color: tema ? tertiary_color(tema) : '#666',
    }

    const singoloEsame = ({ item }: { item: EsameItem }) => {
        const stato = item.voto && parseInt(item.voto) >= 18 ? 1 : item.data.split('/').reverse().join('/') <= getFormatedDate(new Date(), 'YYYY/MM/DD') ? 0 : -1
        /*
            1 superato con esito positivo
            0 sostenuto ma non aggiornato
            -1 non sostenuto ancora
        */
        return (
            <View style={[style.item, { backgroundColor: primary_color(tema) }]}>
                <View style={style.immagineContainer}>
                    <Image source={item.image} style={style.immagine} />
                    {item.diario && item.diario !== '' ?
                        <TouchableOpacity onPress={() => setModalVisible(item.diario ? item.diario : '')}>
                            <View style={[style.diario, { backgroundColor: item.voto ? "#bacdff" : "#ffe491" }]}>
                                <Text style={[style.diarioText, { color: item.voto ? "#4c74dc" : "#ffa600" }]}>Diario</Text>
                            </View>
                        </TouchableOpacity>
                        : null}
                </View>
                <View style={[style.progressoEsame, !tema ? { backgroundColor: item.voto ? "#019d3a" : "#f0b904" } : { borderColor: item.voto ? "#019d3a" : "#f0b904", borderWidth: 2, borderRadius: 25 }]}>
                    <Text style={[style.votoText, tema ? { color: item.voto ? "#019d3a" : "#f0b904" } : {}]}>{item.voto ? item.voto + (item.lode ? 'L' : '') : 'N/A'}</Text>
                </View>
                <View style={style.infoContainer}>
                    <Text style={[style.nome, tema ? { color: 'white' } : {}]}>{item.nome}</Text>
                    <Text style={style.details}>{item.corso}</Text>
                    <Text style={style.details}>CFU: {item.CFU}</Text>
                    <Text style={style.details}>{stato === 1 ? 'Esame superato' : stato === 0 ? 'Esame sostenuto' : 'Esame non ancora sostenuto'}</Text>
                    {item.ora && <Text style={style.details}>{item.data} {item.ora}</Text>}
                    {item.luogo && <Text style={style.details}>Luogo: {item.luogo}</Text>}
                    <Text style={style.details}>Tipologia: {item.tipologia}</Text>
                    <Text style={style.details}>Prof. {item.profEsame}</Text>
                    {item.categoria.length > 0 ? <Text style={style.details}>Categori{item.categoria.length>1?'e':'a'}: {item.categoria.join(', ')}</Text> : null}
                </View>
            </View>
        )
    };


    const itemSeparator = () => <View style={style.separator}></View>;

    return (
        <View style={{ backgroundColor: primary_color(tema), height: '100%' }}>
            <Header 
                title="Lista Esami" 
                leftIcon={faArrowLeft} 
                onPressLeft={() => navigation.goBack()} 
                scuro={tema} 
                rightIcon={icona} 
                onPressRight={updateVisualizzazione}  />
            <SwipeListView
                data={esame.sort((a, b) => a.data.localeCompare(b.data)===0 ? a.ora.localeCompare(b.ora) : a.data.localeCompare(b.data))}
                renderItem={singoloEsame}
                ItemSeparatorComponent={itemSeparator}
                keyExtractor={(e) => e.nome}
                style={[{backgroundColor: primary_color(tema)}, style.lista]}
                leftOpenValue={75}
                stopLeftSwipe={90}
                rightOpenValue={-75}
                stopRightSwipe={-90}
                renderHiddenItem={(data) => (<Bottoni esame={data.item.nome}/>)}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible !== ''}
                onRequestClose={() => setModalVisible('')}
            >
                <Pressable android_disableSound={true} android_ripple={{ color: 'transparent' }} onPress={() => setModalVisible('')} style={[style.modalContainer, { backgroundColor: primary_color(tema) + 'd0' }]}>
                    <Pressable style={[style.modalContent, { backgroundColor: primary_color(tema) }]}>
                        <Text style={[style.modalTitle, { color: tema ? 'white' : 'black' }]}>Diario</Text>
                        <TouchableOpacity style={[style.closeButton, tema ? { borderColor: 'red', borderWidth: 2 } : { backgroundColor: 'red' }]} onPress={() => setModalVisible('')}>
                            <FontAwesomeIcon icon={faTimes} style={{ color: tema ? 'red' : 'white' }} />
                        </TouchableOpacity>
                        <Text
                            style={[style.textInput, { color: tertiary_color(tema) }]}
                        >{modalVisible}</Text>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const style = StyleSheet.create({
    
    backIcon: {
        color: 'black',
        marginRight: rapportoOrizzontale(20),
    },
    listHeadline: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        paddingVertical: rapportoVerticale(15),
        paddingHorizontal: rapportoOrizzontale(10),
    },
    immagineContainer: {
        alignItems: 'center',
        marginRight: 10,
        marginTop: 5,
    },
    immagine: {
        height: 55,
        width: 55,
        borderRadius: 8,
    },
    diario: {
        marginTop: 5,
        borderRadius: 30,
        width: 60,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    diarioText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4c74dc',

    },
    progressoEsame: {
        height: rapportoOrizzontale(34),
        width: rapportoOrizzontale(34),
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 20,
        right: 15,
    },
    votoText: {
        color: 'white',
        textAlign: 'center',
    },
    infoContainer: {
        flex: 1,
        marginLeft: rapportoOrizzontale(10),
    },
    nome: {
        fontWeight: '600',
        fontSize: 16,
        color: 'black',
    },
    details: {
        fontSize: 14,
        color: '#666'
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: secondary_color,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        maxWidth: 250,
        width: '80%'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        top: rapportoVerticale(10),
        left: rapportoOrizzontale(10),
    },
    textInput: {
        marginTop: rapportoVerticale(25),
        width: '100%',
        maxWidth: rapportoOrizzontale(200),
        height: rapportoVerticale(100),
        borderColor: secondary_color,
        borderWidth: 1,
        borderRadius: 5,
        padding: rapportoOrizzontale(10),
        marginBottom: rapportoVerticale(10),
        textAlignVertical: 'top',
    },
    closeButton: {
        position: 'absolute',
        top: rapportoVerticale(10),
        right: rapportoOrizzontale(10),
        width: rapportoOrizzontale(25),
        height: rapportoOrizzontale(25),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    lista: {
        marginBottom: rapportoOrizzontale(60),
    },
    bottoniContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    eliminaContainer: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%',
    },
    elimina: {
        color: 'white',
    },
    modificaContainer: {
        backgroundColor: 'darkgray',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%',
    },
    modifica: {
        color: 'white',
    },
    
});


export default ListaEsami