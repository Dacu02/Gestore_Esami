import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from 'react';
import { DataBaseContext } from "../DataBase"
import SQLite from 'react-native-sqlite-storage'
import { View, Animated, StyleSheet, Dimensions, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { primary_color, secondary_color, tertiary_color } from '../../global';
import { Avatar, Button, Card, Text, SegmentedButtons } from 'react-native-paper';
import Header from '../Header';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { getFormatedDate } from 'react-native-modern-datepicker';
type EsameItem = {
  voto: string,
  data: Date,
  nome: string,
  cfu: number,
}

type ListaProps = {
  esami: EsameItem[],
  tema: boolean,
}

type Dato = {
  nome: String
  valore: number
}

const Statistiche = () => {

  const db = useContext(DataBaseContext) as SQLite.SQLiteDatabase
  const [esame, setEsame] = useState<EsameItem[]>([])
  const [loading, setLoading] = useState(true);
  const [analitiche, setAnalitiche] = useState<Dato[] | null>([])



  //dati del diagramma rotondo "progress-chart"

    

  const data = {
    labels: ["Esami passati", "CFU "], // optional
    data: [0.4, 0.6]
  };
  const loadData = () => {

    const dati: EsameItem[] = [];
    db.transaction((tx) => tx.executeSql('select nome, voto, data, cfu from esame where voto is not null order by data desc', [], (t, results) => {
      for (let i = 0; i < results.rows.length; i++) {
        const dd = results.rows.item(i).data.split('/')[2]
        const mm = results.rows.item(i).data.split('/')[1] - 1
        const yyyy = results.rows.item(i).data.split('/')[0]
        const esame = {
          nome: results.rows.item(i).nome,
          voto: results.rows.item(i).voto,
          lode: results.rows.item(i).lode,
          cfu: results.rows.item(i).cfu,
          data: new Date(yyyy, mm, dd),
        }
        dati.push(esame);

      }

      let media = 0
      dati.map((item) => media += parseInt(item.voto))
      media = media / dati.length

      let ponderata = 0
      dati.map((item) => ponderata += parseInt(item.voto) * item.cfu)
      let cfuTot = 0
      dati.map((item) => cfuTot += item.cfu)
      ponderata = ponderata / cfuTot

      const stats = dati.length !== 0 ? [
        {
          nome: 'Voto minimo',
          valore: Math.min(...dati.map((item) => parseInt(item.voto)))
        },
        {
          nome: 'Voto massimo',
          valore: Math.max(...dati.map((item) => parseInt(item.voto)))
        },
        {
          nome: 'Media aritmetica',
          valore: media
        },
        {
          nome: 'Media ponderata',
          valore: ponderata
        }
      ] : null

      setEsame(dati);
      setLoading(false);
      setAnalitiche(stats)
    }));

  };

  const getTema = async () =>
    (await AsyncStorage.getItem('tema') === 'dark')

  const [tema, setTema] = useState(true)

  useEffect(() => {
    loadData()
    getTema().then(value => setTema(value))
  }, [])

  const [width, setWidth] = useState(Dimensions.get('window').width)
  useEffect(() => {
    const updateLayout = () => {
      setWidth(Dimensions.get('window').width)
    }
    Dimensions.addEventListener('change', updateLayout)
  }, [])

  return (
    <>
      
      <ScrollView style={{ backgroundColor: primary_color(tema) }}>
        <Card style={[style.Card, { backgroundColor: primary_color(tema) }]}>
          <ProgressChart
  data={data}
  width={width}
  height={220}
  strokeWidth={16}
  radius={32}
  chartConfig={{
    backgroundGradientFrom: "#3d85c6",
    backgroundGradientTo: "#073763",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  }}
  style={{
    marginVertical: 8,
    borderRadius: 16,
    width: 100
  }}
  hideLegend={false}
/>
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
  boxCentrale:{
    marginBottom:20,
    marginTop:10
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
