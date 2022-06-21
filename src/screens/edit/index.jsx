import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import ButtonX from "../../components/button";
import Input from "../../components/input";
import { styles } from "./styles";
import { useData } from "../../context";

import * as SQLite from "expo-sqlite";

const Edit = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { userData } = useData();

  useEffect(() => {
    console.log(userData);
    setUser(userData.nome);
    setPassword(userData.senha);
  }, []);

  const db = SQLite.openDatabase("Empresa.db");

  const handleUpdate = (user, password, id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE cliente SET nome = ?, senha = ? WHERE id = ?",
        [user, password, id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Editado com sucesso!");
            navigation.replace("Home");
          } else {
            Alert.alert("Erro ao editar");
          }
        }
      );
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}> Editar usuário </Text>
        <Input
          label={"Usuário"}
          placeholder={"Digite o nome de usuário"}
          type="email-address"
          value={user}
          onChangeText={(e) => setUser(e)}
        />
        <Input
          label={"Senha"}
          placeholder={"Digite a senha"}
          value={password}
          onChangeText={(e) => setPassword(e)}
          secureTextEntry
        />
        <ButtonX onPress={() => handleUpdate(user, password, userData.id)}>
          Editar
        </ButtonX>
        <Text
          style={styles.register}
          onPress={() => navigation.navigate("Home")}
        >
          Cancelar
        </Text>
      </View>
    </>
  );
};

export default Edit;
