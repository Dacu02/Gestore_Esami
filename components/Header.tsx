import React from "react";
import { StyleSheet, Text, View } from "react-native";
//expo-status-bar

const Header = (props:any) => {
    return (
        <>
            <View style={{marginLeft:15}}>
                <Text style={{fontWeight: 'bold', fontSize:22}}>Text</Text>
               {props.name}
             
            </View>
        
        </>

    )
}

const style = StyleSheet.create({
    "text": {
        color: 'black'
    }}
)
export default Header;