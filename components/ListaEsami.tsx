import React, { useContext } from "react";
import { StyleSheet, Text, Image, View, FlatList, ScrollView } from "react-native";
import { DataBaseContext } from "./DataBase";
import Header from "./Header";
export default function ListaEsami() {
    const db = useContext(DataBaseContext);

    const esame = [
        //cambiare il nome dell'esame passando gli esami sul database
        //fixare le immagini
    {   id: 1, 
        name: 'Analisi I', 
        image: require('../immaginiEsami/EsameSuperato.png'), 
        voto: "28", 
        CFU: 9, 
        dataSuperamento: '15/12/2024' ,
        profEsame:'Prof.De Risi'},
    {   id: 2, 
        name: 'Mobile Programming', 
        image: require('../immaginiEsami/EsameSuperato.png'), 
        voto: "18", 
        CFU: 12, 
        dataSuperamento: '01/06/2024' ,
        profEsame:'Prof.Petrone'},
    {   id: 3, 
        name: 'Basi di dati', 
        image: require('../immaginiEsami/EsameSuperato.png'), 
        voto: "25", 
        CFU: 6, 
        dataSuperamento: '08/10/2024' ,
        profEsame:'Prof.Carosetti'},
    {   id: 4, 
        name: 'Programmazione ad oggetti', 
        image: require('../immaginiEsami/EsameInAttesa.png'), 
        voto: null, 
        CFU: 6, 
        dataSuperamento: null ,
        profEsame:'Prof.Bianchi'},
    {   id: 5, 
        name: 'Fisica II', 
        image: require('../immaginiEsami/EsameInAttesa.png'), 
        voto: null, 
        CFU: 9, 
        dataSuperamento: null ,
        profEsame:'Prof.Rossi'},
    ];

    //interfaccia per i tipi di Esame altrimenti abbiamo difficoltà con tsx
    interface EsameItem {
        id: number,
        name: string,
        image: any,
        voto: string | null,
        CFU: number,
        dataSuperamento: string | null,
        profEsame:string | null
    }

    const singoloEsame = ({ item }: { item: EsameItem }) => (
        <View style={styles.item}>
            <View style={styles.immagineContainer}>
                <Image source={item.image} style={styles.immagine} />
            </View>
            <View style={[styles.progressoEsame, { backgroundColor: item.voto ? "#019d3a" : "#f0b904" }]}>
                <Text style={styles.votoText}>
                {item.voto ? item.voto : 'N/A'}    
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>CFU: {item.CFU}</Text>
                <Text style={styles.details}>
                    {item.dataSuperamento ? `Data di Superamento: ${item.dataSuperamento}` : 'Esame non ancora superato'}
                </Text>
                <Text style={styles.details}>
                    {item.profEsame}
                </Text>
               
                
            </View>
        </View>
    );

    const headerComponent = () => {
        return <Text style={styles.listHeadline}> Lista Esami </Text>;
    };

    const itemSeparator = () => {
        return <View style={styles.separator}></View>;
    };

    return (
        <View>
            <FlatList
                ListHeaderComponentStyle={styles.listHeader}
                ListHeaderComponent={Header}
                data={esame}
                renderItem={singoloEsame}
                ItemSeparatorComponent={itemSeparator}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listHeader: {
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listHeadline: {
        color: '#333',
        fontSize: 22,
        fontWeight: 'bold'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13,
    },
    immagineContainer: {
        borderRadius: 100,
        height: 89,
        width: 89,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:37
    },
    immagine: {
        height: 55,
        width: 55,
    },
    name: {
        fontWeight: '600',
        fontSize: 16,
        color:'black'
    },
    infoContainer: {
        marginLeft: 13,
        flex: 1,
       
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
        top: 17,
        right: 15,
    },
    votoText: {
        color: 'white',
        textAlign: 'center',
    },
});