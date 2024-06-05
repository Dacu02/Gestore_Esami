import { IconDefinition, faChartColumn, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { primary_color, secondary_color, rapportoVerticale } from '../../global';
import { NavigationProp } from '@react-navigation/native';

type FooterProps = {
    navigation: NavigationProp<any>,
    scuro: boolean,
}

const Footer = ( { navigation, ...props }: FooterProps) => {


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
            paddingTop: rapportoVerticale(10),
            paddingBottom: rapportoVerticale(10),
        },
        
        footerContainer: {
            backgroundColor: primary_color(props.scuro),
            position: 'absolute',
            bottom: 0,
        }
    })


    const Tab = (props: {icon: IconDefinition, nav: string}) => (
        <TouchableOpacity style={style.tab} onPress={() => { navigation.navigate(props.nav) }}>
            <FontAwesomeIcon size={20} color={secondary_color} icon={props.icon} />
        </TouchableOpacity>

    )
    return (
        <View style={style.footerContainer}>
            <View style={style.footer}>
                <Tab icon={faList}  nav="ListaEsami"/>
                <Tab icon={faPlus} nav="ModificaEsame"/>
                <Tab icon={faChartColumn} nav="Statistiche" />
            </View>
        </View>
    )
}

export default Footer;