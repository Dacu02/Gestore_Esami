import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { primary_color, secondary_color, tertiary_color } from "../global"
import { rapportoOrizzontale, rapportoVerticale, scala, getOrientamento } from "../global"
const Header = (props: any) => {

    const style = StyleSheet.create({
        header: {
            backgroundColor: primary_color(props.scuro),
            alignItems: 'center',
            paddingTop: rapportoVerticale(10),
            borderBottomWidth: 3,
            paddingBottom: rapportoVerticale(5),
            borderColor: secondary_color,
            display: "flex",
            flexDirection: "column",

        },
        testo: {
            fontSize: 22,
            marginTop: rapportoVerticale(5),
            color: tertiary_color(props.scuro),
            textAlign: "center",
        },
        headerInside: {
            backgroundColor: primary_color(props.scuro),
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: rapportoOrizzontale(20),
        }
    })

    return (
        <View style={style.header}>
            {
                props.icon && props.icon == true ?
                    <FontAwesomeIcon size={60} icon={faGraduationCap} color={secondary_color} /> : null
            }
            <View style={style.headerInside}>
                {props.leftIcon ? <TouchableOpacity onPress={props.onPressLeft}>
                    <FontAwesomeIcon size={30} icon={props.leftIcon} color={secondary_color} />
                </TouchableOpacity> : <View style={{ width: 30 }}></View>}
                    {
                        props.title ?
                            <Text style={style.testo}>{props.title}</Text>
                            : null
                    }
                {props.rightIcon ? <TouchableOpacity onPress={props.onPressRight}>
                    <FontAwesomeIcon size={30} icon={props.rightIcon} color={secondary_color} />
                </TouchableOpacity> : <View style={{ width: 30 }}></View>}
            </View>
        </View>
    )
}

export default Header;