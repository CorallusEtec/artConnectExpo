import { style } from "@/style/pages/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BannerLogo } from "@/components/BannerLogo";
import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
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
          <BannerLogo size={'8%'}/>

      {/* resto da página */}
      <View style={style.view1}>
        <Text style={{ fontSize: 24, fontWeight: "500" }}>Login</Text>

        <View style={{ width: '85%' }}>
          <InputIcon
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
          <InputSenha
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
            <Text style={{ fontSize: 15 }}>Lembre-se de Mim</Text>
          </Pressable>
        </View>

        <TextButton
          variant="primary"
          title="Login"
          onPress={logar}
          style={{
            width: "85%",
            height: "10%",
            justifyContent: "center",
            backgroundColor: "#2563eb",
          }}
        />

        <View style={{flexDirection: 'row', width: '100%', padding: 10, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{width: '40%', height: 1, backgroundColor: '#9b9b9b'}} />
          <Text style={{color: '#9b9b9b', fontSize: 13}}> ou </Text>
          <View style={{width: '40%', height: 1, backgroundColor: '#9b9b9b'}} />
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
          <Text style={{ fontSize: 15, color: "#374151" }}>
            Continuar sem login
          </Text>
        </Pressable>
 
        <Pressable onPress={() => router.navigate("/cadastro")}>
          <Text
            style={{
              fontSize: 15,
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
