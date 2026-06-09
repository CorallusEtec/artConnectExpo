import { BannerLogo } from "@/components/BannerLogo";
import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/cadastro";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Masculino", value: "m" },
    { label: "Feminino", value: "f" },
    { label: "Não binário", value: "n" },
    { label: "Prefiro não informar", value: "" },
  ]);

  return (
    <SafeAreaView style={style.container}>
      <BannerLogo />

      <View>
        <View style={style.titleContainer}>
          <Text style={style.titulo}> Cadastre-se </Text>
        </View>

        <ScrollView>
          <View style={style.inputContainer}>
            <View style={style.inputGroup}>
              <InputIcon
                label="Nome"
                placeholder="Digite seu nome"
                onChangeText={setNome}
                value={nome}
                icon="account-outline"
              />
              <InputIcon
                label="Email"
                placeholder="Digite seu email"
                onChangeText={setEmail}
                value={email}
                icon="email-outline"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <InputSenha
                label="Senha"
                placeholder="Crie sua senha"
                onChangeText={setSenha}
                value={senha}
              />
              <InputSenha
                label="Confirmar Senha"
                placeholder="Digite a senha novamente"
                onChangeText={setConfirmaSenha}
                value={confirmaSenha}
              />
            </View>
          </View>
          {/* botoes */}
          <View style={style.btnContainer}>
            <View style={style.btnGroup}>
              <TextButton variant="primary" title="Cadastrar" />
              <TextButton
                variant="secondary"
                title="Já tenho login"
                onPress={() => router.back()}
              />
            </View>
          </View>
          <View
            style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}
          >
            <Pressable onPress={() => router.navigate("/cadastro/contratante")}>
              <Text
                style={{
                  color: gStyles.azul[200],
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                Deseja cadastrar como Contratante? Clique aqui
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
