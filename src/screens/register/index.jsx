import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import ButtonX from "../../components/button";
import Input from "../../components/input";
import { styles } from "./styles";
import Db from "../../database/services";

const Register = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("Log");
  }, []);

  var db = new Db();

  const insereDado = (user, password) => {
    db.initDb();
    let cliente = {
      nome_cliente: user,
      senha_cliente: password,
    };
    db.addCliente(cliente);
    navigation.navigate("Login")
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}> Cadastre-se </Text>
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
        <ButtonX onPress={() => insereDado(user, password)}>Cadastrar</ButtonX>
      </View>
    </>
  );
};

export default Register;
