import { View } from "react-native";
import { Text } from "react-native-paper";
import Feather from "@expo/vector-icons/Feather";

export default function EmptyState() {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <Feather
        name="search"
        size={40}
        color="#bdbdbd"
      />

      <Text
        style={{
          marginTop: 10,
        }}
      >
        Digite algo para pesquisar
      </Text>
    </View>
  );
}