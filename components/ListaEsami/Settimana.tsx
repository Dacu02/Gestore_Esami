import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Lista from './Lista';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { tertiary_color } from '../../global';

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

interface ListaProps {
    esami: EsameItem[],
    tema: boolean,
    setModalVisible: (text: string) => void,
    modalVisible: string,
    naviga: (esame: string) => void,
    delete: (esame: string) => void,
    inizio: String,
    fine: String,
}
const Settimana = (props: ListaProps) => {
    if (props.esami.length === 0) return null

    const [mostra, setMostra] = useState(true)

    return (
        <>
            <Pressable onPress={()=>setMostra(!mostra)} android_ripple={{ color: tertiary_color(!props.tema) }} style={[style.row, {borderColor: tertiary_color(props.tema)}]}>
                <FontAwesomeIcon icon={mostra ? faAngleDown : faAngleRight} color={props.tema ? 'white' : 'black'} />
                <Text style={[{color:tertiary_color(props.tema)}, style.text]}>{props.inizio} - {props.fine}</Text>
            </Pressable>
            { mostra ? 
            <Lista
                esami={props.esami}
                tema={props.tema}
                setModalVisible={props.setModalVisible}
                delete={props.delete}
                modalVisible={props.modalVisible}
                naviga={props.naviga}
                children={null}

            /> : null}
        </>
    )
}

const style = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        columnGap: 10,
        paddingLeft: 10,
        marginHorizontal: 5,
        borderBottomWidth: 3,
    },
    text: {
        fontSize: 20,
    }
})

export default Settimana;