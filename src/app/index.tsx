import { InputIcon } from "@/components/InputIcon";
import { TextButton } from "@/components/TextButton";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { gStyles } from "./style/gStyle";

export default function Index() {
  return (
    <View style={style.container}>
      <InputIcon placeholder="Insira seu nome">
        <FontAwesome name="user" size={24} color={gStyles.azul[500]} />
      </InputIcon>

      <TextButton
        theme="secondary"
        title="Olá Mundo"
        onPress={() => console.log("Ola Mundo!")}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 8,
  },
});
