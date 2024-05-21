import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import React from "react"
import { StyleSheet, Text, View } from "react-native"

const Header = (props: any) => {
    return (
        <View style={style.header}>
            <FontAwesomeIcon size={60} icon={faGraduationCap} color="rgb(8,65,151)" />
            {
                props.title ?
                    <Text style={style.testo}>{props.title}</Text>
                    : null
            }
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        backgroundColor: 'rgb(246, 246, 254)',
        alignItems: 'center',
        paddingTop: 10,
    },
    testo: {
        fontSize: 22,
        marginTop: 5,
        paddingBottom: 10,
        color: "#3a414a",
    }
})
export default Header;