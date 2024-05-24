import React, { useEffect, createContext, useState } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';


export const DataBaseContext = createContext({});
export const DataBase = ({ children }: any) => {

    const [db, setDB] = useState({})

    useEffect(() => {
        setDB(openDatabase({ name: 'esami', location: 'default' }, (conn) => {
            conn.executeSql('create table if not exists esame (' +
                'nome varchar(60) primary key,' +
                'corso varchar(60),' +
                'cfu integer check(cfu>0),' +
                'tipologia varchar(60),' +
                'docente varchar(60),' +
                'voto integer check(voto>17 and voto<=31),' +
                'data date not null,' +
                'ora time,' +
                'luogo varchar(60));')
        }, (err)=> {
            console.error(err)
        }))
    }, [])

    return (
        <DataBaseContext.Provider value={db}>
            {children}
        </DataBaseContext.Provider>
    );
};
