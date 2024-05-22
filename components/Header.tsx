import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Header = (props: any) => {
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

const style = StyleSheet.create({
    header: {
        backgroundColor: 'rgb(246, 246, 254)',
        alignItems: 'center',
        paddingTop: 10,
        borderBottomWidth: 1,
        display: "flex",
        flexDirection: "column",

    },
    testo: {
        fontSize: 22,
        marginTop: 5,
        paddingBottom: 10,
        color: "#3a414a",
        flex: 8,
        textAlign: "center"
    },
    icon: {
        flex: 1
    },
    headerInside: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
    }
})
export default Header;