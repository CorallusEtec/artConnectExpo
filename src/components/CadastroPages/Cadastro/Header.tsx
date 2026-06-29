import { View } from "react-native";
import { Text } from "react-native-paper";
import { style } from "./style";

export function Header() {
  return (
    <View>
      <Text variant="headlineSmall" style={style.pageTitle}>
        Criar conta
      </Text>
      <Text variant="bodyMedium" style={style.subtitle}>
        Cadastre-se para começar a contratar e divulgar arte.
      </Text>
    </View>
  );
}