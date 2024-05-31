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
                tx.executeSql('drop table if exists categoria') //! DEBUG
                tx.executeSql('drop table if exists appartiene') //! DEBUG

                // Tabella esame
                tx.executeSql('create table if not exists esame (' +
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
                tx.executeSql('create table if not exists categoria (' +
                    'nome varchar(60) primary key,' + //nome categoria
                    'colore char(7) check(colore like \'#______\'));') //colore categoria

                // Tabella assocaizione esame-categoria
                tx.executeSql("create table if not exists appartiene (" +
                    "nomeEsame varchar(60) not null," +
                    "nomeCategoria varchar(60) not null," +
                    "primary key (nomeEsame, nomeCategoria)," +
                    "foreign key (nomeEsame) references esame(nome) on delete cascade," +
                    "foreign key (nomeCategoria) references categoria(nome) on delete cascade);")

                tx.executeSql("insert into esame values ('Analisi 1','Matematica','9','scritto','Prof. Rossi','30','1','2021/01/15','19:00','Aula 1', 'ciao');") //! DEBUG
                tx.executeSql("insert into esame values ('Analisi 2','Matematica','9','orale','Prof. Rossi', null,'1','2024/06/01','15:30','Aula 2', 'prossimo');") //! DEBUG
                tx.executeSql("insert into esame values ('Fisica 1','Matematica','9','orale e scritto','Prof. De Risi', null, null,'2024/05/01','10:00','Aula 2', 'esempio esame non mantenuto aggiornato dall\'utente');") //! DEBUG
                tx.executeSql("insert into categoria values ('Primo Semestre', '#FF0000');") //! DEBUG 1° sem rosso
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
