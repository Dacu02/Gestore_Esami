import { faHouse, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = ({navigation}:any) => {
    return (
        <View style={style.footer}>
            <TouchableOpacity style={style.tab} onPress={()=>{navigation.navigate("AggiungiEsame")}}>
                <FontAwesomeIcon size={20} color={"#084197"} icon={faPlus} />
            </TouchableOpacity>
            <TouchableOpacity style={style.tab}>
                <FontAwesomeIcon size={20} color={"#084197"} icon={faHouse} />
            </TouchableOpacity>
            <TouchableOpacity style={style.tab}>
                <FontAwesomeIcon size={20} color={"#084197"} icon={faUser} />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    footer: {
        backgroundColor: 'rgb(246, 246, 254)',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        position: 'absolute',
        bottom: 0,

    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
    testo: {
        fontSize: 22,
        marginTop: 5,
        paddingBottom: 10,
        color: "#282c33",
    }
})
export default Footer;