import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={style.footer}>
            <View style={style.tab}>
                <FontAwesomeIcon size={20} color={"#084197"} icon={faHouse} />
                {/* <Text style={style.testo}>Home</Text> */}
            </View>
            <View style={style.tab}>
                <FontAwesomeIcon size={20} color={"#084197"} icon={faHouse} />
                {/* <Text style={style.testo}>Home</Text> */}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    footer: {
        backgroundColor: 'rgb(246, 246, 254)',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",

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