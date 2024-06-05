import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from 'react';
import { DataBaseContext } from "../DataBase"
import SQLite from 'react-native-sqlite-storage'
import { View, StyleSheet, Dimensions, ScrollView, FlatList,ActivityIndicator } from 'react-native';
import { primary_color, rapportoOrizzontale, secondary_color, tertiary_color } from '../../global';
import { Card, Text } from 'react-native-paper';
import Header from '../Header';
import {
  LineChart,
  ProgressChart,
} from "react-native-chart-kit";
import { MultiSelect } from 'react-native-element-dropdown';

type EsameItem = {
  voto: string,
  data: Date,
  nome: string,
  cfu: number,
  categoria: string[],
}

type Dato = {
  nome: string
  valore: number
}


const Statistiche = () => {

  const db = useContext(DataBaseContext) as SQLite.SQLiteDatabase
  const [esame, setEsame] = useState<EsameItem[]>([])
  const [vista, setVista] = useState<EsameItem[]>([])
  const [analitiche, setAnalitiche] = useState<Dato[] | null>([])
  const[loading, setLoading] = useState(true)

  const [dataCerchio, setDataCerchio] = useState({
    labels: ["Esami", "CFU"],
    data: [0, 0]
  });
  const [categoria, setCategoria] = useState<string[]>([])
  const [categorieInserite, setCategorieInserite] = useState([] as string[])

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
          categoria: [] as string[],
        }
        t.executeSql('select categoria from appartiene where esame = ?', [results.rows.item(i).nome], (_, res) => {
          for (let j = 0; j < res.rows.length; j++)
            esame.categoria.push(res.rows.item(j).categoria)
        })
        dati.push(esame);

      }

      const temp = [] as string[]

      tx.executeSql('select nome from categoria', [], (_, res) => {
        for (let i = 0; i < res.rows.length; i++)
          temp.push(res.rows.item(i).nome)
        setCategorieInserite(temp)
      })

      tx.executeSql('select cfu from esame where voto is null', [], (_, res) => {
        const nonPassati = res.rows.length
        const newDataCerchio = { ...dataCerchio }
        newDataCerchio.data = [dati.length / (dati.length + nonPassati), 0] // rapporto esami passati su totali
        let cfuOttenuti = 0
        dati.map((item) => cfuOttenuti += item.cfu)

        let cfuTotali = 0
        for (let i = 0; i < res.rows.length; i++)
          cfuTotali += res.rows.item(i).cfu
        newDataCerchio.data[1] = cfuOttenuti / (cfuOttenuti + cfuTotali) // rapporto cfuOttenuti su cfu totali
        setDataCerchio(newDataCerchio)
        setLoading(false);
      })

      //media
      let media = 0
      dati.map((item) => media += parseInt(item.voto))
      media = media / dati.length

      //ponderata
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
        },
        {
          nome: 'Voto di laurea',
          valore: ponderata * 110 / 30
        }
      ] : null

      setEsame(dati);
      setVista(dati);
      setAnalitiche(stats);
      
    }));

  };


  const getPlaceHolder = () => {
    if (categoria.length === 0)
      return 'Seleziona categoria'
    let str = categoria[0]
    for (let i = 1; i < categoria.length; i++)
      str += ', ' + categoria[i]
    return str
  }



  useEffect(() => {
    let media = 0
    vista.map((item) => media += parseInt(item.voto))
    media = media / vista.length

    let ponderata = 0
    vista.map((item) => ponderata += parseInt(item.voto) * item.cfu)
    let cfuTot = 0
    vista.map((item) => cfuTot += item.cfu)
    ponderata = ponderata / cfuTot

    const stats = vista.length !== 0 ? [
      {
        nome: 'Voto minimo',
        valore: Math.min(...vista.map((item) => parseInt(item.voto)))
      },
      {
        nome: 'Voto massimo',
        valore: Math.max(...vista.map((item) => parseInt(item.voto)))
      },
      {
        nome: 'Media aritmetica',
        valore: media
      },
      {
        nome: 'Media ponderata',
        valore: ponderata
      }, {
        nome: 'Voto di laurea',
        valore:  analitiche ? analitiche[4].valore : 0
      }
    ] : null
    setAnalitiche(stats)
  }, [vista])

  const getTema = async () =>
    (await AsyncStorage.getItem('tema') === 'dark')

  const [tema, setTema] = useState(true)
  const [width, setWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    loadData()
    getTema().then(value => setTema(value))

    const updateLayout = () => {
      setWidth(Dimensions.get('window').width)
    }
    Dimensions.addEventListener('change', updateLayout)
  }, [])

  useEffect(() => {
    if (categoria.length === 0)
      setVista(esame)
    else {
      const temp = [] as EsameItem[]
      esame.forEach((item) => {
        if (categoria.some((cat) => item.categoria.includes(cat)))
          temp.push(item)
      })
      setVista(temp)
    }
  }, [categoria])


if(loading){
  return(
    <View style={style.loadingContainer}>
      <ActivityIndicator size='large' color='#0000ff'/>
      <Text> Stiamo calcolando le tue statistiche...</Text>
    </View>
  );
}

  return (
    <>
      <Header scuro={tema} title='Statistiche' />
      <ScrollView style={{ backgroundColor: primary_color(tema) }}>
        <Card style={[style.Card, { backgroundColor: primary_color(tema) }]}>
          <Card.Content style={style.Content}>
            <Text variant="titleLarge" style={{ color: tertiary_color(tema) }}>Analisi</Text>
            <MultiSelect
              selectedTextStyle={{ color: tertiary_color(tema) }}
              mode='auto'
              search={false}
              data={categorieInserite.map((v) => ({ value: v }))}
              placeholder={getPlaceHolder()}
              labelField={'value'}
              valueField={'value'}
              value={categoria}
              key={'value'}
              style={{ backgroundColor: primary_color(tema), width: '80%', paddingLeft: 20, borderRadius: 10, marginRight: '7.5%' }}
              itemTextStyle={{ color: tertiary_color(tema) }}
              placeholderStyle={{ color: tertiary_color(tema) + (categoria.length > 0 ? '' : '80') }}
              onChange={setCategoria}
              containerStyle={{ backgroundColor: primary_color(tema), borderRadius: 10, borderWidth: 0 }}
              itemContainerStyle={{ backgroundColor: primary_color(tema), borderColor: secondary_color }}
              selectedStyle={{ display: 'none' }}
              activeColor={secondary_color + 'bb'}
              renderItem={(item) => (
                <Text style={[style.selectItem, { color: tertiary_color(tema) }]}>{item.value}</Text>
              )}
            />
          </Card.Content>

          <Text style={[style.cardLabel, { color: tertiary_color(tema) }]}>Grafico andamento esami</Text>

          {
            vista.length != 0 ?
              <LineChart

                data={{
                  labels: vista.map((item) => item.nome),
                  datasets: [
                    {
                      data: vista.map((item) => parseInt(item.voto)),

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

          <View style={[style.boxCentrale, { backgroundColor: primary_color(tema), height: 'auto' }]}>
            <View>
              <Text style={[style.titolo, { color: tertiary_color(tema) }]}>Dati statistici</Text>
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
              keyExtractor={(item) => item.nome}

            />
          </View>
          <Card style={[style.Card, { backgroundColor: primary_color(tema) }]}>
            <ProgressChart
              data={dataCerchio}
              width={width}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundGradientFrom: "#3d85c6",
                backgroundGradientTo: "#073763",
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 1,
                barPercentage: 0.5,
                useShadowColorFromDataset: false
              }}
              style={{
                borderRadius: 16,
                marginBottom:20,

              }}
              hasLegend
            />
          </Card>
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
  boxCentrale: {
    marginBottom: 20,
    marginTop: 10
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
  selectList: {
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    margin: 10
  },
  selectItem: {
    padding: rapportoOrizzontale(10),
    margin: rapportoOrizzontale(5),
  },
  loadingContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  
  },
});

export default Statistiche;
