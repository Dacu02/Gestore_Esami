import { faHouse, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { primary_color, secondary_color, tertiary_color } from '../global';

const Footer = ( { navigation, ...props }: any) => {


    const style = StyleSheet.create({
        footer: {
            flexDirection: "row",
            display: "flex",
            minWidth: "75%",
            borderTopWidth: 3,
            borderColor: secondary_color,
            marginRight: "12.5%",
            marginLeft: "12.5%",
            backgroundColor: primary_color(props.scuro),

        },
        tab: {
            flex: 1,
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
        },
        
        footerContainer: {
            backgroundColor: primary_color(props.scuro),
            position: 'absolute',
            bottom: 0,
        }
    })

    console.log(props.scuro)

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

export default Footer;