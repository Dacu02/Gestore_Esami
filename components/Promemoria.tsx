
import React, { useEffect, useContext, useState } from "react"
import { Settings, StyleSheet, Text, View, TextInput, Modal, Dimensions, TouchableOpacity, Pressable, Switch } from "react-native"
import Footer from "./Footer"
import { primary_color, secondary_color, tertiary_color } from '../global'
import Header from "./Header"
import { faCalendarDays, faGear } from "@fortawesome/free-solid-svg-icons"
import { DataBase, DataBaseContext } from "./DataBase"
import { openDatabase } from 'react-native-sqlite-storage'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SelectList } from "react-native-dropdown-select-list"

const Promemoria = (props: any) => {
    return (
        <View style={props.style.promemoria}>
            <Text style={props.style.titoloPromemoria}>{props.nome}</Text>
            <View style={props.style.contenutoPromemoria}>
                {props.corso ? <Text style={props.style.testoPromemoria}>Corso: {props.corso}</Text> : null}
                {props.cfu ? <Text style={props.style.testoPromemoria}>CFU: {props.cfu}</Text> : null}
                {props.tipologia ? <Text style={props.style.testoPromemoria}>Tipologia: {props.tipologia}</Text> : null}
                {props.docente ? <Text style={props.style.testoPromemoria}>Docente: {props.docente}</Text> : null}
            </View>
            <View>

                {props.luogo ? <Text style={props.style.luogoPromemoria}>{props.luogo}</Text> : null}
                <Text style={props.style.dataPromemoria}>{props.data} - {props.ora}</Text>
            </View>
        </View>
    )
}
export default Promemoria;