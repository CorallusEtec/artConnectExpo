import { style } from "@/style/pages/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BannerLogo } from "@/components/BannerLogo";
import { PaperInputIcon } from "@/components/PaperInputIcon";
import { PaperInputSenha } from "@/components/PaperInputSenha";
import { TextButton } from "@/components/TextButton";
import { AuthService } from "@/services/AuthService";
import LoginService from "@/services/LoginService";
import UsuarioService from "@/services/UsuarioService";
import { useAuthStore } from "@/store";
import { gStyles } from "@/style/gStyle";
import { FontAwesome6 } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";

export default function Login() {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { setUsuario } = useAuthStore();

  const hasPreviousPage = router.canGoBack();

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
        {hasPreviousPage && (
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
        )}
      </View>
      {/* view da imagem de banner  */}
      <View style={{ paddingTop: '40%', flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
        <BannerLogo size={'80%'} />
      </View>

      {/* resto da página */}
      <View style={style.view1}>
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>Login</Text>

        <View style={{ width: '85%' }}>
          <PaperInputIcon
            label="Email"
            placeholder="Digite seu Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="email-outline"
          />
        </View>

        <View style={{ width: '85%' }}>
          <PaperInputSenha
            label="Senha"
            placeholder="Digite sua Senha"
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={{ width: '85%' }}>
          <Pressable
            onPress={() => setChecked(!checked)}
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => setChecked(!checked)}
              color={checked ? "#2563eb" : undefined}
            />
            <Text style={{ fontSize: 16 }}>Lembre-se de Mim</Text>
          </Pressable>
        </View>

        <TextButton
          theme="primary"
          title="Login"
          onPress={logar}
          style={{
            width: "85%",
            height: "10%",
            justifyContent: "center",
            backgroundColor: "#2563eb",
          }}
        />

         <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "85%",
            gap: 8,
          }}
        >
          
          <View style={{flex: 1,height: 1,backgroundColor: "#c6c6c6"}}/>
          <Text style={{ color: "#9ca3af", fontSize: 16 }}>ou</Text>
          <View style={{flex: 1, height: 1, backgroundColor: "#c6c6c6"}}/>

        </View>
 
        <Pressable
          style={({ pressed }) => ({
            width: "85%",
            height: "10%",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#c6c6c6",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? "#f3f4f6" : "#ffffff",
          })}
        >
          <Text style={{ fontSize: 16, color: "#374151" }}>
            Continuar sem login
          </Text>
        </Pressable>
 
        <Pressable onPress={() => router.navigate("/cadastro")}>
          <Text
            style={{
              fontSize: 16,
              color: "#374151",
              textDecorationLine: "underline",
            }}
          >
            Criar uma Conta
          </Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}
