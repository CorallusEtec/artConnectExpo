import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import { style } from "./style";

export function LoginFooter({ loginLink }: any) {
  return (
    <>
      <View style={style.linhaOuWrapper}>
        <View style={style.linhaOu} />
        <Text style={style.textoOu}>ou</Text>
        <View style={style.linhaOu} />
      </View>
      <View style={style.loginContainer}>
        <Text variant="bodyMedium" style={style.loginText}>
          Já possui uma conta?
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text variant="bodyMedium" style={loginLink}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}