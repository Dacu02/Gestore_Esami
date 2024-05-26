import React, { useEffect, createContext, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';


export const DataBaseContext = createContext({});
export const DataBase = ({ children }: any) => {

    const [db, setDB] = useState({})
    useEffect(() => {

        const initDB = async () => {
            const conn = SQLite.openDatabase({ name: 'esami.db', location: 'default' })
            const dbc = await conn;
            await dbc.executeSql('create table if not exists esame (' +
                'nome varchar(60) primary key,' +
                'corso varchar(60),' +
                'cfu integer check(cfu>0),' +
                'tipologia varchar(60),' +
                'docente varchar(60),' +
                'voto integer check(voto>17 and voto<31),' +
                'lode boolean,' +
                'data date,' +
                'ora time,' +
                'luogo varchar(60),' +
                'diario text,' +
                'check ((lode and voto=30) or not lode));')
            setDB(dbc);
        }
        initDB();
    }, [])

    return (
        <DataBaseContext.Provider value={db}>
            {children}
        </DataBaseContext.Provider>
    );
};
