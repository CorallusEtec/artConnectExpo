import { style } from "./style";
import { View } from "react-native";
import { Text } from "react-native-paper";

export function Header() {
  return (
    <View style={style.header}>
      <Text variant="headlineSmall" style={style.title}>
        Qual o seu tipo de arte?
      </Text>
      <Text variant="bodyMedium" style={style.subtitle}>
        Escolha sua área principal de atuação
      </Text>
    </View>
  );
}