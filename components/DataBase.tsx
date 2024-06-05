import React, { useEffect, createContext, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';


export const DataBaseContext = createContext({});
export const DataBase = (props: {children: React.ReactNode}) => {

    const [db, setDB] = useState({})
    useEffect(() => {

        const initDB = async () => {
            SQLite.enablePromise(true);
            const conn = SQLite.openDatabase({ name: 'esami.db', location: 'default' })
            const dbc = await conn;
            
               
                // Tabella esame
                await dbc.executeSql('create table if not exists esame (' +
                    'nome varchar(60) primary key,' + //nome esame
                    'corso varchar(60) not null,' + // nome corso di laurea
                    'cfu integer check(cfu>0) not null,' + // cfu
                    'tipologia varchar(60) check(tipologia=\'scritto\' or tipologia=\'orale\' or tipologia=\'scritto e orale\' or tipologia=\'orale e scritto\') not null,' + // tipologia: scritto, orale, scritto e orale
                    'docente varchar(60) not null,' + // nome docente
                    'voto integer check(voto>17 and voto<31),' + // voto in trentesimi [18,30]
                    'lode boolean,' + //lode si no
                    'data char(10) not null,' + //data YYYY/MM/DD (sqlite non ha tipo data)
                    'ora char(5) not null,' + //ora HH:MM (sqlite non ha tipo ora)
                    'luogo varchar(60),' + //luogo del'esame
                    'diario text,' + //note personali
                    'check ((lode and voto=30) or not lode));') //lode solo con 30

                // Tabella categoria
                await dbc.executeSql('create table if not exists categoria (' +
                    'nome varchar(60) primary key);')


                // Tabella assocaizione esame-categoria
                await dbc.executeSql("create table if not exists appartiene (" +
                    "esame varchar(60) not null," +
                    "categoria varchar(60) not null," +
                    "primary key (esame, categoria)," +
                    "foreign key (esame) references esame(nome)," +
                    "foreign key (categoria) references categoria(nome));")

                 setDB(dbc);
            }
        initDB()
    }, [])

    return (
        <DataBaseContext.Provider value={db}>
            {props.children}
        </DataBaseContext.Provider>
    );
};
