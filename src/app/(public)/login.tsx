import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/login";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthService } from "@/services/AuthService";
import LoginService from "@/services/LoginService";
import UsuarioService from "@/services/UsuarioService";
import { useAuthStore } from "@/store";

export default function Login() {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { setUsuario } = useAuthStore();

  async function logar() {
    try {
      const validacao = LoginService.validarLogin({ email, senha });

      if (!validacao.valido) {
        setErro(validacao.mensagem);
        return;
      }

      const data = await AuthService.login({ email, senha });
      const id = data.id;
      const responseUsuario = await UsuarioService.findById(id);
      const usuario: any = await responseUsuario.json();

      setUsuario(usuario);

      await AsyncStorage.setItem("@artconnect:token", JSON.stringify(data));

      router.replace("/home");
    } catch (erro: any) {
      setErro(erro.message);
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("@/assets/template/bannerLogin.png")}
          style={{ width: "100%", height: 300 }}
        />
        <Image
          source={require("@/assets/template/onda.png")}
          style={{ width: "100%", height: 450, position: "absolute" }}
        />
        <Pressable
          onPress={() => router.back()}
          style={{
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 25,
            top: 60,
            left: 10,
          }}
        >
          <FontAwesome6
            name="circle-arrow-left"
            size={35}
            color={gStyles.azul[500]}
          />
        </Pressable>
      </View>

      <View style={style.view1}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Login</Text>

        {erro ? (
          <Text style={{ color: "red", textAlign: "center" }}>{erro}</Text>
        ) : null}

        <InputIcon
          style={{ width: 185 }}
          placeholder="Digite seu Email"
          value={email}
          onChangeText={setEmail}
        >
          <FontAwesome name="envelope" size={17} color={gStyles.azul[500]} />
        </InputIcon>

        <InputSenha
          style={{ width: 163 }}
          placeholder="Digite sua Senha"
          value={senha}
          onChangeText={setSenha}
        >
          <FontAwesome name="lock" size={17} color={gStyles.azul[500]} />
        </InputSenha>

        <Pressable
          onPress={() => setChecked(!checked)}
          style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
        >
          <Checkbox
            value={checked}
            onValueChange={setChecked}
            color={checked ? "#2563eb" : undefined}
          />
          <Text>Lembre-se de Mim</Text>
          <Pressable>
            <Text style={{ textDecorationLine: "underline" }}>
              Esqueci a Senha
            </Text>
          </Pressable>
        </Pressable>

        <TextButton
          theme="primary"
          title="Login"
          onPress={logar}
          style={{
            width: "55%",
            height: "15%",
            justifyContent: "center",
            backgroundColor: "#2563eb",
          }}
        />

        <TextButton
          theme="secondary"
          title="Cadastrar"
          onPress={() => router.navigate("/cadastro")}
          style={{ width: "55%", height: "15%", justifyContent: "center" }}
        />

        <TextButton
          theme="secondary"
          title="HOme"
          onPress={() => router.navigate("/home")}
          style={{ width: "55%", height: "15%", justifyContent: "center" }}
        />
      </View>
    </SafeAreaView>
  );
}
