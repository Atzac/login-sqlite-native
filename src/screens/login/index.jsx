import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import ButtonX from "../../components/button";
import Input from "../../components/input";
import { useData } from "../../context";
import { styles } from "./styles";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Empresa.db");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (name, pw) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cliente WHERE nome=(?)",
        [name],
        (tx, results) => {
          console.log(results);
          if (results.rows.length > 0) {
            Alert.alert("Sucesso");
            navigation.navigate("Home");
          } else {
            Alert.alert("Nome de usuário não existe");
          }
        }
      );
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}> Bem vindo! </Text>
        <Input
          label={"Usuário"}
          placeholder={"Digite o usuário"}
          type="email-address"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <Input
          label={"Senha"}
          placeholder={"Digite a senha"}
          value={password}
          onChangeText={(e) => setPassword(e)}
          secureTextEntry
        />
        <ButtonX onPress={() => handleLogin(email, password)}>Login</ButtonX>
        <Text
          style={styles.register}
          onPress={() => navigation.navigate("Register")}
        >
          Cadastrar
        </Text>
      </View>
    </>
  );
};

export default Login;
