import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { primary_color, secondary_color, tertiary_color } from '../global';
import { Avatar, Button, Card, Text , SegmentedButtons } from 'react-native-paper';
import Header from './Header';
const LeftContent = (props:any) => <Avatar.Icon {...props} icon="folder" />;




const Statistiche = () => {
    const [value, setValue] = React.useState('');
    return(
    <View>
         <View style={style.header}>
                <Text style={style.headerText}>Analitycs</Text>
            </View>
         <View style={style.container}>
         <SegmentedButtons
        
          
          density='small'
          theme={{
          colors:{onSecondaryContainer:'#4c74dc' , secondaryContainer:'#bacdff'},
          }}
          value={value}
          onValueChange={setValue}

          buttons={[
            {
              value: '1',
              label: 'Aritmetica',
              labelStyle:style.Segment,
            },
            {
              value: '2',
              label: 'Ponderata',
              labelStyle:style.Segment,
            },
            { value: '3',
             label:   'Completa' ,
             labelStyle:style.Segment,
            },
          ]}
        />

  <Card style={style.Card}>
    <Card.Content style={style.Content}>
      <Text variant="titleLarge">Analisi</Text>
      <View style={[style.esito, { backgroundColor:  "#99ffaf" }]}>
                        <Text style={[style.esitoText, {color:"#239900"}]}>Positivo</Text>
                    </View>
    </Card.Content>

    <Text style={style.cardLabel}variant="bodyMedium">Grafico andamento esami</Text>

    <Card.Cover style={style.Cover} source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
   
    </Card.Actions>
  </Card>
  <Card style={style.Card}>
    <Card.Content>
      <Text variant="titleLarge">Analisi</Text>
      <Text variant="bodyMedium">Andamento esami</Text>
      <Text variant="titleLarge">Analisi</Text>
      <Text variant="bodyMedium">Andamento esami</Text>
      <Text variant="titleLarge">Analisi</Text>
      <Text variant="bodyMedium">Andamento esami</Text>
    </Card.Content>
    <Card.Actions>
  
    </Card.Actions>
  </Card>
        </View>
  </View>
);
};

const style = StyleSheet.create({
    Card:{
        marginTop:10,
        backgroundColor:'white'
    },
    cardLabel:{
      marginLeft:15
    },
    Cover:{
        padding:10,
        backgroundColor:'white'
    },
    Content:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    header: {
        marginTop:10,
        alignItems: 'center',
        height: 60
    },
    headerText: {
        alignItems: 'center',
        fontSize:22,
        fontWeight:'700'
    },
    esito: {
        borderRadius: 30,
        width: 80,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    esitoText:{
        fontSize: 14,
        fontWeight: '600',
    },
    container: {
       marginTop:10,
       color:'red'
      },
      Segment:{
        fontSize:14
      },
});

export default Statistiche;
