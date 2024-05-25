import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import {primary_color, secondary_color, tertiary_color} from "../global"
const Header = (props: any) => {

const style = StyleSheet.create({
    header: {
        backgroundColor: primary_color(props.scuro),
        alignItems: 'center',
        paddingTop: 10,
        borderBottomWidth: 3,
        borderColor: secondary_color,
        display: "flex",
        flexDirection: "column",

    },
    testo: {
        fontSize: 22,
        marginTop: 5,
        paddingBottom: 10,
        color: tertiary_color(props.scuro),
        flex: 8,
        textAlign: "center"
    },
    icon: {
        flex: 1
    },
    headerInside: {
        backgroundColor: primary_color(props.scuro),
        display: "flex",
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
    }
})

    return (
        <View style={style.header}>
            <FontAwesomeIcon size={60} icon={faGraduationCap} color="rgb(8,65,151)" />
            <View style={style.headerInside}>
                {props.leftIcon ? <TouchableOpacity onPress={props.onPressLeft}>
                    <FontAwesomeIcon size={30} icon={props.leftIcon} color="rgb(8,65,151)" style={style.icon} />
                </TouchableOpacity> : null}
                {
                    props.title ?
                        <Text style={style.testo}>{props.title}</Text>
                        : null
                }
                {props.rightIcon ? <TouchableOpacity onPress={props.onPressRight}>
                    <FontAwesomeIcon size={30} icon={props.rightIcon} color="rgb(8,65,151)" style={style.icon} />
                </TouchableOpacity> : null}
            </View>
        </View>
    )
}

export default Header;