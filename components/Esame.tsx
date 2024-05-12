import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
/*  
    ! Ogni esame riporta differenti informazioni, esempio: nome, corso di studi,
    ! CFU, data, ora, luogo, tipologia d’esame, docente, voto

    * Schermata aggiunta e modifica esame e diario
    ! 1. Deve permettere di aggiungere un nuovo esame oppure modificarne uno
    !esistente (quest’ultimo scelta dalla schermata 2).
    ? 2. Deve permettere di modificare il diario associato ad un esame.
*/


const Esame = () => {
    const style = StyleSheet.create({
        riga: {
            display: "flex",
            flexDirection: "row",
            margin: 20,
            alignItems: "center",

        },
        text: {
            color: "black",
            flex: 1,
            fontSize: 20,
            textAlign: "center",
        },
        textfield: {
            color: "black",
            fontSize: 20,
        }
    })
    const Riga = (props: any) => {

        return (
            <View style={style.riga}>
                <Text style={style.text}>{props.testo}</Text>
                <TextInput style={style.text} placeholder={"Inserisci" + props.testo} placeholderTextColor="#888"/>
            </View>
        )
    }
    return (
        <>
            <Riga testo="Nome"/>
            <Riga testo="Corso"/>
            <Riga testo="Voto"/>
        </>
    )
}

export default Esame;