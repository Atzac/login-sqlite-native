import { View, TextInput, Text } from "react-native";
import { styles } from "./styles";

const Input = ({ value, onChangeText, type, label, placeholder }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{ label }</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          keyboardType={type}
          secureTextEntry
        />
      </View>
    </>
  );
};

export default Input;
