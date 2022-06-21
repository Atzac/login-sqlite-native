import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import ButtonX from "../../components/button";
import { styles } from "./styles";
import * as SQLite from "expo-sqlite";
import { useData } from "../../context";


const db = SQLite.openDatabase("Empresa.db");

const Home = ({ navigation }) => {
  const [data, setData] = useState();
  const [reload, setReload] = useState(false);
  const { setUserData } = useData();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [reload]);

  const handleCreenUpdate = (data) => {
    setUserData(data)
    navigation.navigate("Edit")
  }

  const loadUsers = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cliente ORDER BY nome",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setData(temp);
        }
      );
    });
  };

  const handleDelete = (id_cliente) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM cliente WHERE id=(?)",
        [id_cliente],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Deletado com Sucesso");
          } else {
            Alert.alert("Erro ao deletar");
          }
        }
      );
    });

    setReload(!reload);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}> Lista de users </Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            //  <Text>{item.nome}</Text>
            <View
              key={item.id}
              style={{
                backgroundColor: "#dde2e8",
                padding: 15,
                marginTop: 10,
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>ID: {item.id}</Text>
                <Text>NOME: {item.nome}</Text>
              </View>
              <View
                style={{ justifyContent: "flex-end", flexDirection: "row" }}
              >
                <View style={{ marginRight: 5 }}>
                  <Button
                    title="Alterar"
                    onPress={() => handleCreenUpdate(item)}
                  />
                </View>
                <View>
                  <Button
                    title="Excluir"
                    onPress={() => handleDelete(item.id)}
                  />
                </View>
              </View>
            </View>
          )}
        />
        <ButtonX onPress={() => navigation.navigate("Login")}>Sair</ButtonX>
      </View>
    </>
  );
};

export default Home;
