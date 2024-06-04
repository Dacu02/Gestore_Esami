import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState,useContext } from 'react';
import { DataBaseContext } from "../DataBase"
import SQLite from 'react-native-sqlite-storage'
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { primary_color, secondary_color, tertiary_color } from '../../global';
import { Avatar, Button, Card, Text , SegmentedButtons } from 'react-native-paper';
import Header from '../Header';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Lista from '../ListaEsami/Lista';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { getFormatedDate } from 'react-native-modern-datepicker';
interface EsameItem {
  
  voto: string ,
  data: Date,
  CFU?: number,
}
interface ListaProps {
  esami: EsameItem[],
  tema: boolean,
}


const Statistiche = () => {

  
  const db = useContext(DataBaseContext) as SQLite.SQLiteDatabase
  const [esame, setEsame] = useState<EsameItem[]>([])
  const[loading, setLoading] = useState(true);
  
  const loadData = () => {

    const dati: EsameItem[] = [];
    db.transaction((tx)=>tx.executeSql('select voto,data from esame  where voto is not null order by data desc', [], (t, results) => {
        for (let i = 0; i < results.rows.length; i++) {
          const dd = results.rows.item(i).data.split('/')[2]
          const mm = results.rows.item(i).data.split('/')[1] - 1  
          const yyyy = results.rows.item(i).data.split('/')[0]
            const esame = {
                voto: results.rows.item(i).voto,
                lode: results.rows.item(i).lode,
                data: new Date(yyyy, mm, dd),
                   }
                   dati.push(esame);
        }
        setEsame(dati);
        setLoading(false);
    }));
    
};

const getTema = async () =>
(await AsyncStorage.getItem('tema') === 'dark')

const [tema, setTema] = useState(true)

useEffect(() => {
   loadData()
   getTema().then(value => setTema(value))
}, [])




const getMonthName = (monthIndex:number) => {
  const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
  return monthNames[monthIndex];
};

const monthData = esame.map(item => ({
  value: parseInt(item.voto),
  month: getMonthName(item.data.getMonth())
}));

// Ordiniamo l'array in base al nome del mese
monthData.sort((a, b) => {
  const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
  const monthIndexA = monthNames.indexOf(a.month);
  const monthIndexB = monthNames.indexOf(b.month);
  return monthIndexA - monthIndexB;
});

// etichette ordinate per i mesi
const sortedLabels = monthData.map(item => item.month);

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

    {
      esame.length != 0 ?
    <LineChart
    
    data={{
      labels: sortedLabels,
      datasets: [
        {
          data: monthData.map(item => item.value),
          
        },
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={280}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      },
     
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
      width:100
    }}
    
  />
  : null }

          <View style={{ backgroundColor: primary_color(tema), height: 'auto' }}>
            <View>
              <Text style={[style.titolo, {color: tertiary_color(tema)}]}>Dati statistici</Text>
            </View>
            <FlatList
              horizontal
              data={analitiche}
              renderItem={({ item }) => (
                <View style={[style.item, { backgroundColor: primary_color(tema), borderColor: secondary_color, borderWidth: 1 }]}>
                  <Text style={[style.itemText, { color: tertiary_color(tema), fontWeight: 'bold' }]}>{item.nome}</Text>
                  <Text style={[style.itemText, { color: tertiary_color(tema) }]}>{item.valore.toFixed(2)}</Text>

                </View>
              )}
              keyExtractor={(item) => item.valore.toString()}

            />
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  Card: {
    marginTop: 10,
    backgroundColor: 'white'
  },
  cardLabel: {
    marginLeft: 15
  },
  Cover: {
    padding: 10,
    backgroundColor: 'white'
  },
  Content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    marginTop: 10,
    alignItems: 'center',
    height: 60
  },
  headerText: {
    alignItems: 'center',
    fontSize: 22,
    fontWeight: '700'
  },
  esito: {
    borderRadius: 30,
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  esitoText: {
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    marginTop: 10,
    color: 'red'
  },
  Segment: {
    fontSize: 14
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titolo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 22
  },
});

export default Statistiche;
