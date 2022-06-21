import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const ButtonX = ({ value, placeholder, children, onPress }) => {
  return (
    <>
      <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={onPress}>
        <Text style={styles.title}>{children}</Text>
      </TouchableOpacity>
    </>
  );
};

export default ButtonX;
