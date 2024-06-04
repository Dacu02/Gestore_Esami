import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from 'react';
import { DataBaseContext } from "../DataBase"
import SQLite from 'react-native-sqlite-storage'
import { View, Animated, StyleSheet, Dimensions, ScrollView, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
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

const Notifiche = () =>{

    const displayNotifications= async () =>{
        await notifee.requestPermission();
    

    const channelId =  await notifee.createChannel({
        id:'default',
        name:'Default Channel',
    });

    await notifee.displayNotification({
        title:'Titolo notifica',
        body:'Corpo della notifica',
        android:{
            channelId,
            smallIcon: 'cacca',
            pressAction:{
                id:'default',
            },
        },
    });

};

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity 
            style={{
                width:'50%',
                height:50, 
                backgroundColor:'black',
                justifyContent:'center',
                alignItems:'center'}}
                
                onPress={()=>{
                    displayNotifications();
                }}>

                <Text style={{color:'#fff'}}>Notifica negra</Text>
                </TouchableOpacity>
        </View>
    );
}
