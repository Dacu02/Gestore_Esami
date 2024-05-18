import React from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'
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
            marginTop: 20,
            marginRight: 50,
            alignItems: "center",
            marginBottom: 15,

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
            borderColor: "#282c33",
            borderWidth: 2,
            borderRadius: 40,
            backgroundColor: "#ddd",
            padding: 10,
            flex: 1,
            textAlign: "center",
        },
        buttons: {
            display:"flex",
            flexDirection: "row",
        },
        button: {
            flex: 1,
        }
    })
    const Riga = (props: any) => {

        return (
            <View style={style.riga}>
                <Text style={style.text}>{props.testo.toUpperCase()}</Text>
                <TextInput style={style.textfield} placeholder={"Inserisci " + props.testo.toLowerCase()} placeholderTextColor="#888"/>
            </View>
        )
    }
    return (
        <>
            <Riga testo="Nome"/>
            <Riga testo="Corso"/>
            <Riga testo="Voto"/>
            <View style={style.buttons}>
                {/* <Button style={style.button} title="CONFERMA"/>
                <Button style={style.button} title="ANNULLA"/> */}
            </View>
        </>
    )
}

export default Esame;