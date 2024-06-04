import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from 'react';
import { DataBaseContext } from "../DataBase"
import SQLite from 'react-native-sqlite-storage'
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
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
      <Header scuro={tema} title='Statistiche' />
      <ScrollView style={{ backgroundColor: primary_color(tema) }}>
        <Card style={[style.Card, { backgroundColor: primary_color(tema) }]}>
          <Card.Content style={style.Content}>
            <Text variant="titleLarge" style={{ color: tertiary_color(tema) }}>Analisi</Text>
            <View style={[style.esito, { backgroundColor: "#99ffaf" }]}>
              <Text style={[style.esitoText, { color: "#239900" }]}>Positivo</Text>
            </View>
          </Card.Content>

          <Text style={[style.cardLabel, { color: tertiary_color(tema) }]} variant="bodyMedium">Grafico andamento esami</Text>

          {
            esame.length != 0 ?
              <LineChart

                data={{
                  labels: esame.map((item) => item.nome),
                  datasets: [
                    {
                      data: esame.map((item) => parseInt(item.voto)),

                    },
                  ]
                }}
                width={width}
                height={280}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2,
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
                  width: 100
                }}

              />
              : null}

          <View style={{ backgroundColor: primary_color(tema), height: 'auto' }}>
            <View>
              <Text style={[style.titolo, {color: tertiary_color(tema)}]}>Dati statistici</Text>
            </View>
            <FlatList
              horizontal
              data={analitiche}
              renderItem={({ item }) => (
                <View style={[style.item, { backgroundColor: primary_color(tema), borderColor: secondary_color, borderWidth: 1 }]}>
                  <Text style={[style.itemText, { color: tertiary_color(tema), textAlign: 'center', fontWeight: 'bold' }]}>{item.nome}</Text>
                  <Text style={[style.itemText, { color: tertiary_color(tema) }]}>Voto: {item.valore}</Text>

                </View>
              )}
              keyExtractor={(item) => item.nome}

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
  },
  titolo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 22
  },
});

export default Statistiche;
