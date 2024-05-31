import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { primary_color, secondary_color, tertiary_color } from '../global';
import { Avatar, Button, Card, Text , SegmentedButtons } from 'react-native-paper';
import Header from './Header';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
const LeftContent = (props:any) => <Avatar.Icon {...props} icon="folder" />;




const Statistiche = () => {
    const [value, setValue] = React.useState('');
    return(
    <ScrollView>
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
 
  </Card>
        </View>
        <View>
  <Text>Grafico degli esiti</Text>
  <LineChart
    data={{
      labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
  </ScrollView>
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
