import { faHouse, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Footer = ({ navigation }: any) => {

    const Tab = (props: any) => (
        <TouchableOpacity style={style.tab} onPress={() => { navigation.navigate(props.nav) }}>
            <FontAwesomeIcon size={20} color={"#084197"} icon={props.icon} />
        </TouchableOpacity>

    )
    return (
        <View style={style.footerContainer}>
            <View style={style.footer}>
                <Tab icon={faHouse} nav="AggiungiEsame" />
                <Tab icon={faPlus} />
                <Tab icon={faUser} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    footer: {
        flexDirection: "row",
        display: "flex",
        minWidth: "75%",
        borderTopWidth: 1,
        marginRight: "12.5%",
        marginLeft: "12.5%",

    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    testo: {
        fontSize: 22,
        marginTop: 5,
        paddingBottom: 10,
        color: "#282c33",
    },
    footerContainer: {
        backgroundColor: 'rgb(246, 246, 254)',
        position: 'absolute',
        bottom: 0,
    }
})
export default Footer;