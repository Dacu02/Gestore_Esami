import React, { useEffect, createContext, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';


export const DataBaseContext = createContext({});
export const DataBase = ({ children }: any) => {

    const [db, setDB] = useState({})
    useEffect(() => {

        const initDB = async () => {
            const conn = SQLite.openDatabase({ name: 'esami.db', location: 'default' })
            const dbc = await conn;
            dbc.transaction((tx) => {
                tx.executeSql('drop table if exists esame') //! DEBUG
                tx.executeSql('create table if not exists esame (' +
                    'nome varchar(60) primary key,' + //nome esame
                    'corso varchar(60),' + // nome corso di laurea
                    'cfu integer check(cfu>0),' + // cfu
                    'tipologia varchar(60) check(tipologia=\'scritto\' or tipologia=\'orale\' or tipologia=\'scritto e orale\' or tipologia=\'orale e scritto\'),' + // tipologia: scritto, orale, scritto e orale
                    'docente varchar(60),' + // nome docente
                    'voto integer check(voto>17 and voto<31),' + // voto in trentesimi [18,30]
                    'lode boolean,' + //lode si no
                    'data char(10) not null,' + //data YYYY/MM/DD (sqlite non ha tipo data)
                    'ora char(5) not null,' + //ora HH:MM (sqlite non ha tipo ora)
                    'luogo varchar(60),' + //luogo del'esame
                    'diario text,' + //note personali
                    'check ((lode and voto=30) or not lode));') //lode solo con 30
                tx.executeSql("insert into esame values ('Analisi 1','Matematica','9','scritto','Prof. Rossi','30','1','2021/01/15','09:00','Aula 1', 'ciao');") //! DEBUG
                setDB(dbc);
            })
        }
        initDB();
    }, [])

    return (
        <DataBaseContext.Provider value={db}>
            {children}
        </DataBaseContext.Provider>
    );
};
