import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { primary_color, secondary_color, tertiary_color, rapportoOrizzontale, rapportoVerticale } from '../../global';
import { getFormatedDate } from 'react-native-modern-datepicker';

const Esame = (props:any) => {

    style.details = {
        ...style.details,
        color: props.tema ? tertiary_color(props.tema) : '#666',
    }


    const stato = props.item.voto && parseInt(props.item.voto) >= 18 ? 1 : 
        props.item.data <= new Date() ? 0 : -1
    /*
        1 superato con esito positivo
        0 sostenuto ma non aggiornato
        -1 non sostenuto ancora
    */
    return (
        <View style={[style.item, { backgroundColor: primary_color(props.tema) }]}>
            <View style={style.immagineContainer}>
                <Image source={props.item.image} style={style.immagine} />
                {props.item.diario && props.item.diario !== '' ?
                    <TouchableOpacity onPress={() => props.diario(props.item.diario ? props.item.diario : '')}>
                        <View style={[style.diario, { backgroundColor: props.item.voto ? "#bacdff" : "#ffe491" }]}>
                            <Text style={[style.diarioText, { color: props.item.voto ? "#4c74dc" : "#ffa600" }]}>Diario</Text>
                        </View>
                    </TouchableOpacity>
                    : null}
            </View>
            <View style={[style.progressoEsame, !props.tema ? { backgroundColor: props.item.voto ? "#019d3a" : "#f0b904" } : { borderColor: props.item.voto ? "#019d3a" : "#f0b904", borderWidth: 2, borderRadius: 25 }]}>
                <Text style={[style.votoText, props.tema ? { color: props.item.voto ? "#019d3a" : "#f0b904" } : {}]}>{props.item.voto ? props.item.voto + (props.item.lode ? 'L' : '') : 'N/A'}</Text>
            </View>
            <View style={style.infoContainer}>
                <Text style={[style.nome, props.tema ? { color: 'white' } : {}]}>{props.item.nome}</Text>
                <Text style={style.details}>{props.item.corso}</Text>
                <Text style={style.details}>CFU: {props.item.CFU}</Text>
                <Text style={style.details}>{stato === 1 ? 'Esame superato' : stato === 0 ? 'Esame sostenuto' : 'Esame non ancora sostenuto'}</Text>
                {props.item.ora && <Text style={style.details}>{getFormatedDate(props.item.data, 'DD/MM/YYYY')} {props.item.ora}</Text>}
                {props.item.luogo && <Text style={style.details}>Luogo: {props.item.luogo}</Text>}
                <Text style={style.details}>Tipologia: {props.item.tipologia}</Text>
                <Text style={style.details}>Prof. {props.item.profEsame}</Text>
                {props.item.categoria.length > 0 ? <Text style={style.details}>Categori{props.item.categoria.length > 1 ? 'e' : 'a'}: {props.item.categoria.join(', ')}</Text> : null}
            </View>
        </View>
    )
};

const style = StyleSheet.create({
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
})

export default Esame