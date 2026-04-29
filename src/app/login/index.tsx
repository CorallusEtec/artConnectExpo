import { style } from "@/app/login/style";
import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import ArtistaService from "@/services/ArtistaService";
import ContratanteService from "@/services/ContratanteService";
import LoginService from "@/services/LoginService";
import { useAuthStore } from "@/store";
import { gStyles } from "@/style/gStyle";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [checked, setChecked] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const setUsuario = useAuthStore.getState().setUsuario;

  async function logar() {
  try {
    const data = await LoginService.login(email, senha);

    if (data) {
      let usuario = null;
      let tipoConta: 'artista' | 'contratante' = 'artista';

      try {
        usuario = await ArtistaService.getById(data);
        await ArtistaService.saveUserLocal(usuario);
        tipoConta = 'artista';
      
        if (usuario.arte == null) {
          router.replace("/tipoArte");
        } else {
          router.replace("/home");
        }
      } catch (error) {
        try {
          usuario = await ContratanteService.getById(data);
          await ContratanteService.saveUserLocal(usuario);
          router.replace("/home");
          tipoConta = 'contratante';
        } catch (contratanteError) {
          throw new Error("Tipo de conta não identificado");
        }
      }

      setUsuario(usuario, tipoConta);
      
    }
  } catch (erro) {
    console.log("erro:", erro);
    alert("Falha no login");
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
          onPress={() => router.navigate("/home")}
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

        <InputIcon
          style={{ width: 185 }}
          placeholder="Digite seu Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        >
          <FontAwesome name="envelope" size={17} color={gStyles.azul[500]} />
        </InputIcon>

        <InputSenha
          style={{ width: 163 }}
          placeholder="Digite sua Senha"
          value={senha}
          onChangeText={(text) => setSenha(text)}
        >
          <FontAwesome name="lock" size={17} color={gStyles.azul[500]} />
        </InputSenha>

        <Pressable
          onPress={() => setChecked(!checked)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
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
          style={{
            width: "55%",
            height: "15%",
            justifyContent: "center",
          }}
        />
      </View>
    </SafeAreaView>
  );
}
