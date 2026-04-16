import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { Inter_300Light, Inter_400Regular } from "@expo-google-fonts/inter";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [load, erro] = useFonts({
    Inter_300Light,
    Inter_400Regular,
  });

  if (!load) return null; // Ou use o SplashScreen

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
