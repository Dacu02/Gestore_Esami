import React, { useContext,useState } from "react";
import { StyleSheet, Text, Image, View, FlatList, ScrollView, TouchableOpacity, Modal, Button, TextInput} from "react-native";
import { DataBaseContext } from "./DataBase";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native"; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function ListaEsami() {
    const db = useContext(DataBaseContext);
    const navigation = useNavigation(); 
    const [note, setNote] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }
    const esame = [
        //cambiare il nome dell'esame passando gli esami sul database
        //fixare le immagini
    {   id: 1, 
        name: 'Analisi I', 
        corso:'Ingegneria Informatica',
        image: require('../immaginiEsami/Esame.png'), 
        voto: "28", 
        CFU: 9, 
        dataSuperamento: '15/12/2024' ,
        profEsame:'Prof.De Risi', 
        ora: '10:00',
        luogo:'Aula 21',
        tipologia:'Scritto'},

    {   id: 2, 
        name: 'Mobile Programming', 
        corso:'Ingegneria Informatica',
        image: require('../immaginiEsami/Esame.png'), 
        voto: "18", 
        CFU: 12, 
        dataSuperamento: '01/06/2024' ,
        profEsame:'Prof.Petrone', 
        ora: '10:00',
        luogo:'Aula 21',
        tipologia:'Scritto'},

    {   id: 3, 
        name: 'Basi di dati', 
        corso:'Ingegneria Informatica',
        image: require('../immaginiEsami/Esame.png'), 
        voto: "25", 
        CFU: 6, 
        dataSuperamento: '08/10/2024' ,
        profEsame:'Prof.Carosetti', 
        ora: '10:00',
        luogo:'Aula 21',
        tipologia:'Scritto'},

    {   id: 4, 
        name: 'Programmazione ad oggetti', 
        corso:'Ingegneria Informatica',
        image: require('../immaginiEsami/EsameInAttesa.png'), 
        voto: null, 
        CFU: 6, 
        dataSuperamento: null ,
        profEsame:'Prof.Bianchi', 
        ora: null,
        luogo:null,
        tipologia:'Scritto'},

    {   id: 5, 
        name: 'Fisica II', 
        corso:'Ingegneria Informatica',
        image: require('../immaginiEsami/EsameInAttesa.png'), 
        voto: null, 
        CFU: 9, 
        dataSuperamento: null ,
        profEsame:'Prof.Rossi', 
        ora: null,
        luogo:null,
        tipologia:'Scritto'},
    ];

    //interfaccia per i tipi di Esame altrimenti abbiamo difficoltà con tsx
    interface EsameItem {
        id: number,
        name: string,
        corso:string,
        tipologia:string,
        image: any,
        voto: string | null,
        CFU: number,
        dataSuperamento: string | null,
        profEsame:string | null,
        ora: string | null,
        luogo:string | null,
    }

    const singoloEsame = ({ item }: { item: EsameItem }) => (
        <View style={styles.item}>
            <View style={styles.immagineContainer}>
                <Image source={item.image} style={styles.immagine} />
                <TouchableOpacity onPress={toggleModal}>
                    <View  style={[styles.diario, {borderColor: item.voto ? "#4c74dc" : "#f0b904"}]}>
                    <Text style={styles.diarioText}>Diario</Text>
                    </View>
                    
                </TouchableOpacity>
            </View>
            <View style={[styles.progressoEsame, { backgroundColor: item.voto ? "#019d3a" : "#f0b904" }]}>
                <Text style={styles.votoText}>
                {item.voto ? item.voto : 'N/A'}    
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>{item.corso}</Text>
                <Text style={styles.details}>CFU: {item.CFU}</Text>
                <Text style={styles.details}>
                    {item.dataSuperamento ? `Data di Superamento: ${item.dataSuperamento}` : 'Esame non ancora superato'}
                </Text>
                <Text style={[styles.details, !item.ora && {display: 'none'}]}>{item.ora ? `Orario: ${item.ora}` : null}</Text>
                <Text style={[styles.details, !item.luogo && {display: 'none'}]}>Luogo: {item.luogo}</Text>
                <Text style={styles.details}>Tipologia: {item.tipologia}</Text>
                <Text style={styles.details}>
                    {item.profEsame}
                </Text>
            </View>
        </View>
    );

    const headerComponent = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.listHeadline}> Lista Esami </Text>
                
            </View>
        );
    };

    const itemSeparator = () => {
        return <View style={styles.separator}></View>;
    };

    return (
        <View>
            <FlatList
                
                ListHeaderComponent={headerComponent}
                data={esame}
                renderItem={singoloEsame}
                ItemSeparatorComponent={itemSeparator}
            />
            <Modal
            
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Diario</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                            <FontAwesomeIcon icon={faTimes} style={styles.closeButtonIcon} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInput}
                            multiline
                            numberOfLines={4}
                            onChangeText={text => setNote(text)}
                            value={note}
                            placeholder="Scrivi qui le tue note..."
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height:60
    },
    backIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginRight: 20,
        color: 'black', // colore dell'icona
    },
    listHeadline: {
        color: '#333',
        fontSize: 22,
        fontWeight: 'bold',
        flex:1,
        textAlign:'center',
        paddingRight:55,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 17,
    },
    immagineContainer: {
        borderRadius: 100,
        height: 150,
        width: 89,
        alignItems: 'center',
    },
    diario:{
        marginTop:5,
        borderWidth:2,
        textAlign:'center',
        justifyContent:'center',
        borderRadius:30,
        borderColor:'#4c74dc',
        width:60,
        height:30,
        
    },
    diarioText:{
        textAlign:'center',
        justifyContent:'center',
        fontSize:14,
        padding:3,
        fontWeight:'600',
        color:'black'
    },
    immagine: {
        height: 55,
        width: 55,
        borderRadius:8
    },
    name: {
        fontWeight: '600',
        fontSize: 16,
        color:'black'
    },
    infoContainer: {
        marginLeft: 13,
        flex: 1,
        height:'auto'
    },
    details: {
        fontSize: 14,
        color: '#666',
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#CCC',
    },
    progressoEsame: {
        height: 34,
        width: 34,
        backgroundColor: "#019d3a",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        position: 'absolute',
        top: 20,
        right: 15,
    },
    votoText: {
        color: 'white',
        textAlign: 'center',
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
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'black',
        position:'absolute',
        top: 10,
        left: 10,

    },
    textInput: {
        marginTop:25,
        width: '100%',
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        textAlignVertical: 'top', // Aligns text to the top in multiline TextInput
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'red',
        borderRadius:100,
    },
    closeButtonIcon: {
        color:'white',
        fontSize: 24,
    },
});