import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

const db = SQLite.openDatabase(
  "Empresa.db",
  "1.0",
  "SQLite React Offline Database",
  200000
);

export default class Db {
  initDb() {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='cliente'",
        [],
        function (tx, result) {
          console.log("item:", result.rows.length);
          if (result.rows.length == 0) {
            tx.executeSql("DROP TABLE IF EXISTS cliente", []);
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS cliente(id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(20), senha VARCHAR(8))",
              []
            );
          }
        }
      );
    });
  }

  addCliente(cliente) {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO cliente (nome, senha) VALUES (?,?)",
        [cliente.nome_cliente, cliente.senha_cliente],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Cadastro", "Registro Inserido com Sucesso");
          } else {
            Alert.alert("Erro no Cadastro");
          }
        }
      );
    });
  }
}
