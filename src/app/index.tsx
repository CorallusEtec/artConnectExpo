import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Redirect } from 'expo-router';

export default function Index() {
  return (
    <View style={style.container}>
      <InputIcon placeholder="Insira seu nome">
        <FontAwesome name="user" size={24} color={gStyles.azul[500]} />
      </InputIcon>

      <InputSenha>
        <FontAwesome name="lock" size={24} color={gStyles.azul[500]} />
      </InputSenha>

      <TextButton
        theme="primary"
        title="Olá Mundo"
        onPress={() => router.navigate("/home")}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 8,
    gap: 10,
  },
});
