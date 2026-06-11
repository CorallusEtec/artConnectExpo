import { style } from "@/style/pages/login";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AlertMessage } from "@/components/AlertMessage";
import { BannerLogo } from "@/components/BannerLogo";
import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { schema } from "@/schemas/loginSchema";
import { useLoginMutate } from "@/services/AuthService";
import { Button, Checkbox } from "react-native-paper";
export default function Login() {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const errorMessage = useRef("");
  const [showAlert, setShowAlert] = useState(false);
  const { mutate, isPending, isError, error, data } = useLoginMutate();

  async function login() {
    const result = schema.safeParse({ email, senha });
    // Validando campos
    if (!result.success) {
      errorMessage.current = result.error?.issues[0].message;
      setShowAlert(true);
      // Mandando requisição
    } else {
      mutate({ email, senha });
      if (isError) {
        errorMessage.current = error.message;
        setShowAlert(true);
      }
    }
  }
  function guest() {
    (async () => {})();
  }
  console.log(data?.status);
  return (
    <SafeAreaView style={style.container}>
      <AlertMessage
        text={errorMessage.current}
        visible={showAlert}
        onDismiss={() => setShowAlert(false)}
      />

      <BannerLogo />
      {/* resto da página */}
      <View style={style.view1}>
        <Text style={[style.titulo, { fontWeight: 500 }]}>Login</Text>

        <View style={style.inputWrapper}>
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

        <View style={style.inputWrapper}>
          <InputSenha
            label="Senha"
            placeholder="Digite sua Senha"
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={style.inputWrapper}>
          <Pressable
            onPress={() => setChecked(!checked)}
            // inline
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => setChecked(!checked)}
              color={checked ? "#2563eb" : undefined}
            />
            <Text style={style.textoPadrão}>Lembre-se de Mim</Text>
          </Pressable>
        </View>

        <View style={style.inputWrapper}>
          <Button
            mode="contained"
            disabled={isPending}
            loading={isPending}
            onPress={() => login()}
          >
            Login
          </Button>
        </View>

        <View style={style.linhaOuWrapper}>
          <View style={style.linhaOu} />
          <Text style={[style.textoDetalhe, { color: "#9b9b9b" }]}> ou </Text>
          <View style={style.linhaOu} />
        </View>

        {/*
        <Button
          onPress={() => router.navigate("/home")}
          mode="outlined"
          style={{ width: "80%", borderRadius: 12, borderColor: "#c6c6c6" }}
        >
          Continuar sem Login
        </Button>
        */}

        <Pressable onPress={() => router.navigate("/cadastro")}>
          <Text
            style={[
              style.textoPadrão,
              {
                color: "#374151",
                textDecorationLine: "underline",
              },
            ]}
          >
            Criar uma Conta
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
