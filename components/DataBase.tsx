import React, { useEffect, createContext, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';


export const DataBaseContext = createContext({});
export const DataBase = ({ children }: any) => {

    const [db, setDB] = useState({})
    useEffect(() => {

        const initDB = async () => {
            SQLite.enablePromise(true);
            const conn = SQLite.openDatabase({ name: 'esami.db', location: 'default' })
            const dbc = await conn;
                // tx.executeSql('drop table if exists esame') //! DEBUG
                // tx.executeSql('drop table if exists categoria') //! DEBUG
                // tx.executeSql('drop table if exists appartiene') //! DEBUG

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

                // tx.executeSql("insert into esame values ('Analisi 1','Matematica','9','scritto','Prof. Rossi','30','1','2021/01/15','19:00','Aula 1', 'ciao');") //! DEBUG
                // tx.executeSql("insert into esame values ('Analisi 2','Matematica','9','orale','Prof. Rossi', null,'1','2024/06/01','15:30','Aula 2', 'prossimo');") //! DEBUG
                // tx.executeSql("insert into esame values ('Fisica 1','Matematica','9','orale e scritto','Prof. De Risi', null, null,'2024/05/01','10:00','Aula 2', 'esempio esame non mantenuto aggiornato dall\'utente');") //! DEBUG
                setDB(dbc);
            }
        initDB().then(() => console.log('DB inizializzato')).catch((err) => console.error(err))
    }, [])

    return (
        <DataBaseContext.Provider value={db}>
            {children}
        </DataBaseContext.Provider>
    );
};
