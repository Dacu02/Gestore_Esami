import React, { useContext, useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, Text, Image, View, FlatList, TouchableOpacity, Modal, Pressable } from "react-native"
import { DataBaseContext } from "../DataBase"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import { primary_color, secondary_color, tertiary_color } from "../../global"
import SQLite from 'react-native-sqlite-storage'
import { getFormatedDate } from "react-native-modern-datepicker"
import Header from "../Header"
import { getOrientamento, rapportoOrizzontale, rapportoVerticale, scala } from "../../global"

const ListaEsami = ({ navigation }: any) => {

    //interfaccia per gli item altrimenti typescript da problemi
    interface EsameItem {
        nome: string,
        corso: string,
        tipologia: string,
        image: any,
        voto: string | null,
        CFU: number,
        data: string
        profEsame: string | null,
        ora: string | null,
        luogo: string,
        diario: string | null,
    }

    const [esame, setEsame] = useState<EsameItem[]>([])

    const db = useContext(DataBaseContext);
    const [modalVisible, setModalVisible] = useState("");



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
                        CFU: results.rows.item(i).cfu,
                        data: results.rows.item(i).data.split('/').reverse().join('/'),
                        profEsame: results.rows.item(i).docente,
                        ora: results.rows.item(i).ora,
                        luogo: results.rows.item(i).luogo,
                        diario: results.rows.item(i).diario,
                        image: results.rows.item(i).data <= getFormatedDate(new Date(), 'YYYY/MM/DD') && results.rows.item(i).voto ? require('../../immaginiEsami/Esame.png') : require('../../immaginiEsami/EsameInAttesa.png')
                    }
                    // TODO Finsci il controllo per vedere se l'esame è stato superato
                    dati.push(esame);
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
            <TouchableOpacity activeOpacity={0.7} onLongPress={() => navigation.navigate('ModificaEsame', { esame: item.nome })} style={[style.item, { backgroundColor: primary_color(tema) }]}>
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
                    <Text style={[style.votoText, tema ? { color: item.voto ? "#019d3a" : "#f0b904" } : {}]}>{item.voto ? item.voto : 'N/A'}</Text>
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
                </View>
            </TouchableOpacity>
        )
    };


    const itemSeparator = () => <View style={style.separator}></View>;

    return (
        <View style={{ backgroundColor: primary_color(tema), height: '100%' }}>
            <Header title="Lista Esami" leftIcon={faArrowLeft} onPressLeft={() => navigation.goBack()} scuro={tema} />
            <FlatList
                data={esame}
                renderItem={singoloEsame}
                ItemSeparatorComponent={itemSeparator}
                keyExtractor={(_, i) => i.toString()}
                style={[{backgroundColor: primary_color(tema)}, style.lista]}
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
        height: 34,
        width: 34,
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
    }
});


export default ListaEsami