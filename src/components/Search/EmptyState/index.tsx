import Feather from "@expo/vector-icons/Feather";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { style } from "./style";

export default function EmptyState() {
  return (
    <View style={style.container}>
      <Feather name="search" size={40} color="#bdbdbd" />
      <Text style={style.supportText}>Digite algo para pesquisar</Text>
    </View>
  );
}
