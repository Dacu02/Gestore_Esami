import React, { useContext, useState , useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, Text, Image, View, FlatList, TouchableOpacity, Modal, TextInput, Pressable } from "react-native"
import { DataBaseContext } from "./DataBase"
import { useNavigation } from "@react-navigation/native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import { primary_color, secondary_color, tertiary_color } from "../global"
import SQLite from 'react-native-sqlite-storage'
import { getFormatedDate } from "react-native-modern-datepicker"
const ListaEsami = () => {

    /*const esame = [
        { id: 1, name: 'Analisi I', corso: 'Ingegneria Informatica', image: require('../immaginiEsami/Esame.png'), voto: "28", CFU: 9, data: '15/12/2024', profEsame: 'Prof.De Risi', ora: '10:00', luogo: 'Aula 21', tipologia: 'Scritto', diario:1 },
        { id: 2, name: 'Mobile Programming', corso: 'Ingegneria Informatica', image: require('../immaginiEsami/Esame.png'), voto: "18", CFU: 12, data: '01/06/2024', profEsame: 'Prof.Petrone', ora: '10:00', luogo: 'Aula 21', tipologia: 'Scritto', diario:2 },
        { id: 3, name: 'Basi di dati', corso: 'Ingegneria Informatica', image: require('../immaginiEsami/Esame.png'), voto: "25", CFU: 6, data: '08/10/2024', profEsame: 'Prof.Carosetti', ora: '10:00', luogo: 'Aula 21', tipologia: 'Scritto', diario:3 },
        { id: 4, name: 'Programmazione ad oggetti', corso: 'Ingegneria Informatica', image: require('../immaginiEsami/EsameInAttesa.png'), voto: null, CFU: 6, data: null, profEsame: 'Prof.Bianchi', ora: null, luogo: null, tipologia: 'Scritto', diario:4 },
        { id: 5, name: 'Fisica II', corso: 'Ingegneria Informatica', image: require('../immaginiEsami/EsameInAttesa.png'), voto: null, CFU: 9, data: null, profEsame: 'Prof.Rossi', ora: null, luogo: null, tipologia: 'Scritto' , diario:5},
    ];*/

     //interfaccia per gli item altrimenti typescript da problemi
     interface EsameItem {
        name: string,
        corso:string,
        tipologia:string,
        image: any,
        voto: string | null,
        CFU: number,
        data: string
        profEsame:string | null,
        ora: string | null,
        luogo:string,
        diario: string | null,
    }

    const [esame, setEsame] = useState<EsameItem[]>([])

    const db = useContext(DataBaseContext);
    const navigation = useNavigation();
    const [notes, setNotes] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentNoteId, setCurrentNoteId] = useState();

    const toggleModal = (diario:any) => {
        setModalVisible(!modalVisible);
        setCurrentNoteId(diario);
    };


    const loadData = () => {
        const dati: EsameItem[] = [];
        (db as SQLite.SQLiteDatabase).transaction((tx) => {
            tx.executeSql('select * from esame', [], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    const esame = {
                        name: results.rows.item(i).nome,
                        corso: results.rows.item(i).corso,
                        tipologia: results.rows.item(i).tipologia,
                        voto: results.rows.item(i).voto,
                        CFU: results.rows.item(i).cfu,
                        data: results.rows.item(i).data.split('/').reverse().join('/'),
                        profEsame: results.rows.item(i).docente,
                        ora: results.rows.item(i).ora,
                        luogo: results.rows.item(i).luogo,
                        diario: results.rows.item(i).diario,
                        image: results.rows.item(i).data < getFormatedDate(new Date(), 'YYYY/MM/DD') ? require('../immaginiEsami/Esame.png') : require('../immaginiEsami/EsameInAttesa.png')
                    }
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


    const loadNotes = async () => {
        try {
            // Carica le note salvate da AsyncStorage
            const savedNotes = await AsyncStorage.getItem('notes');
            if (savedNotes !== null) {
                // Se ci sono note salvate aggiorna lo stato 
                setNotes(JSON.parse(savedNotes));
            }
        } catch (error) {
            console.error('Errore durante il caricamento delle note:', error);
        }
    };

    const saveNotes = async (updatedNotes:any) => {
        try {
            // Salva le note aggiornate in AsyncStorage
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        } catch (error) {
            console.error('Errore durante il salvataggio delle note:', error);
        }
    };
    const handleNoteChange = (text:any) => {
        const updateNotes = {
            ...notes, [Number(currentNoteId)]: text
        };
            setNotes(updateNotes);
            saveNotes(updateNotes);
    };

   

    style.details = {
        ...style.details,
        color: tema ? tertiary_color(tema) : '#666',
    }

    const singoloEsame = ({ item }:{item:EsameItem}) => {
        const stato = item.voto && parseInt(item.voto) >= 18 ? 1 : item.data.split('/').reverse().join('/') <= getFormatedDate(new Date(),'YYYY/MM/DD') ? 0 : -1
        /*
            1 superato con esito positivo
            0 sostenuto ma non aggiornato
            -1 non sostenuto ancora
        */
        return (
        <View style={[style.item, {backgroundColor: primary_color(tema)}]}>
            <View style={style.immagineContainer}>
                <Image source={item.image} style={style.immagine} />
                <TouchableOpacity onPress={() => toggleModal(item.diario)}>
                    <View style={[style.diario,  !tema ? {backgroundColor: item.voto ? "#bacdff" : "#ffe491"} : {borderColor: item.voto ? "#bacdff" : "#ffe491", borderWidth: 2, borderRadius: 25}]}>
                        <Text style={[style.diarioText, {color:item.voto ? "#4c74dc":"#ffa600"}]}>Diario</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[style.progressoEsame, !tema ? {backgroundColor: item.voto ? "#019d3a" : "#f0b904"} :{borderColor: item.voto ? "#019d3a" : "#f0b904", borderWidth: 2, borderRadius: 25}]}>
                <Text style={[style.votoText, tema ? {color: item.voto ? "#019d3a" : "#f0b904"} : {}]}>{item.voto ? item.voto : 'N/A'}</Text>
            </View>
            <View style={style.infoContainer}>
                <Text style={[style.name, tema ? {color:'white'} : {}]}>{item.name}</Text>
                <Text style={style.details}>{item.corso}</Text>
                <Text style={style.details}>CFU: {item.CFU}</Text>
                <Text style={style.details}>{stato===1 ? 'Esame superato' : stato===0? 'Esame sostenuto' : 'Esame non ancora sostenuto'}</Text>
                {item.ora && <Text style={style.details}>Orario: {item.ora}</Text>}
                {item.luogo && <Text style={style.details}>Luogo: {item.luogo}</Text>}
                <Text style={style.details}>Tipologia: {item.tipologia}</Text>
                <Text style={style.details}>{item.profEsame}</Text>
            </View>
        </View>
    )};

    const headerComponent = () => (
        <View style={style.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} style={style.backIcon} />
            </TouchableOpacity>
            <Text style={style.listHeadline}>Lista Esami</Text>
        </View>
    );

    const itemSeparator = () => <View style={style.separator}></View>;

    return (
        <View style={[style.container, {backgroundColor: primary_color(tema)}]}>
            <FlatList
                ListHeaderComponent={headerComponent}
                data={esame}
                renderItem={singoloEsame}
                ItemSeparatorComponent={itemSeparator}
                keyExtractor={(_, i) => i.toString()}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <Pressable android_disableSound={true} android_ripple={{ color: 'transparent' }} onPress={toggleModal} style={[style.modalContainer, {backgroundColor: primary_color(tema)+'d0'}]}>
                    <Pressable style={[style.modalContent, {backgroundColor: primary_color(tema)}]}>
                        <Text style={[style.modalTitle, {color: tema?'white':'black'}]}>Diario</Text>
                        <TouchableOpacity style={[style.closeButton, tema ? {borderColor: 'red', borderWidth: 2}: {backgroundColor: 'red'}]} onPress={toggleModal}>
                            <FontAwesomeIcon icon={faTimes} style={{color: tema ? 'red' : 'white'}} />
                        </TouchableOpacity>
                        <TextInput
                            style={[style.textInput, {color: tertiary_color(tema)}]}
                            multiline
                            placeholderTextColor={tertiary_color(tema)+'70'}
                            numberOfLines={4}
                            onChangeText={handleNoteChange}
                            value={currentNoteId ? notes[currentNoteId] || '' : ''}
                            placeholder="Scrivi qui le tue note..."
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backIcon: {
        color: 'black',
        marginRight: 20,
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
        paddingVertical: 15,
        paddingHorizontal: 10,
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
        marginLeft: 10,
    },
    name: {
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
        maxWidth:250
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        top: 10,
        left: 10,
    },
    textInput: {
        marginTop: 25,
        width: '100%',
        maxWidth:200,
        height: 100,
        borderColor: secondary_color,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
});


export default ListaEsami