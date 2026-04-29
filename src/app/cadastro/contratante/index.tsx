import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import ContratanteService from "@/services/ContratanteService";
import { gStyles } from "@/style/gStyle";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./style";

export default function CadastroContratante() {
  const [isEmpresa, setIsEmpresa] = useState(true);
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [documento, setDocumento] = useState("");

  const handleCadastro = async () => {
    try {
      if (!nome || !email || !senha || !confirmaSenha) {
        alert("Preencha todos os campos obrigatórios");
        return;
      }

      if (senha !== confirmaSenha) {
        alert("As senhas não conferem");
        return;
      }

      if (isEmpresa && (!razaoSocial || !documento)) {
        alert("Preencha razão social e CNPJ");
        return;
      }

      const body = {
        nome,
        email,
        senha,
        razaoSocial: isEmpresa ? razaoSocial : null,
        cnpj: isEmpresa ? documento : null,
        tipo: isEmpresa ? ("cnpj" as const) : ("cpf" as const),
      };

      await ContratanteService.save(body);

      router.navigate("/login");
    } catch (err) {
      console.log("ERRO CADASTRO:", err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("@/assets/template/bannerLogin.png")}
          style={{ width: "100%", height: 200 }}
        />
        <Image
          source={require("@/assets/template/onda.png")}
          style={{ width: "100%", height: 350, position: "absolute" }}
        />
        <Pressable
          onPress={() => router.navigate("/home")}
          style={{
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 25,
            top: 10,
            left: 10,
          }}
        >
          <FontAwesome6
            name="circle-arrow-left"
            size={35}
            color={gStyles.azul[200]}
          />
        </Pressable>
      </View>

      <View>
        <View style={style.titleContainer}>
          <Text style={style.titulo}> Cadastre-se como Contratante </Text>
        </View>

        <ScrollView>
          <View style={{ gap: 20 }}>
            <View style={style.inputContainer}>
              <View style={style.toggleContainer}>
                <Pressable
                  style={[
                    style.toggleButton,
                    isEmpresa ? style.toggleButtonActive : style.toggleButtonInactive
                  ]}
                  onPress={() => setIsEmpresa(true)}
                >
                  <Text style={[
                    style.toggleButtonText,
                    isEmpresa ? style.toggleButtonTextActive : style.toggleButtonTextInactive
                  ]}>
                    Empresa
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    style.toggleButton,
                    !isEmpresa ? style.toggleButtonActive : style.toggleButtonInactive
                  ]}
                  onPress={() => setIsEmpresa(false)}
                >
                  <Text style={[
                    style.toggleButtonText,
                    !isEmpresa ? style.toggleButtonTextActive : style.toggleButtonTextInactive
                  ]}>
                    Pessoa Física
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={[style.inputContainer]}>
              {isEmpresa && (
                <View style={style.inputWrapper}>
                  <Text style={style.label}> Razão Social </Text>
                  <InputIcon
                    placeholder="  Digite a razão social"
                    onChangeText={setRazaoSocial}
                    value={razaoSocial}
                  >
                    <FontAwesome
                      name="building"
                      size={24}
                      color={gStyles.azul[200]}
                    />
                  </InputIcon>
                </View>
              )}

              <View style={style.inputWrapper}>
                <Text style={style.label}>Nome</Text>
                <InputIcon
                  placeholder="  Digite seu nome"
                  onChangeText={setNome}
                  value={nome}
                >
                  <FontAwesome
                    name="user"
                    size={24}
                    color={gStyles.azul[200]}
                  />
                </InputIcon>
              </View>

              <View style={style.inputWrapper}>
                <Text style={style.label}> Email </Text>
                <InputIcon
                  placeholder="  Digite seu email"
                  onChangeText={setEmail}
                  value={email}
                >
                  <FontAwesome
                    name="envelope"
                    size={24}
                    color={gStyles.azul[200]}
                  />
                </InputIcon>
              </View>

              <View style={style.inputWrapper}>
                <Text style={style.label}> Senha </Text>
                <InputSenha
                  placeholder="Digite sua senha"
                  onChangeText={setSenha}
                  value={senha}
                >
                  <FontAwesome
                    name="lock"
                    size={24}
                    color={gStyles.azul[200]}
                  />
                </InputSenha>
              </View>

              <View style={style.inputWrapper}>
                <Text style={style.label}> Confirmar senha </Text>
                <InputSenha
                  placeholder="Digite a senha novamente"
                  onChangeText={setConfirmaSenha}
                  value={confirmaSenha}
                >
                  <FontAwesome
                    name="lock"
                    size={24}
                    color={gStyles.azul[200]}
                  />
                </InputSenha>
              </View>

              <View style={style.inputWrapper}>
                <Text style={style.label}>
                  {isEmpresa ? "CNPJ" : "CPF"}
                </Text>
                <InputIcon
                  placeholder={isEmpresa ? "  XX.XXX.XXX/XXXX-XX" : "  XXX.XXX.XXX-XX"}
                  onChangeText={setDocumento}
                  value={documento}
                >
                  <FontAwesome
                    name="id-card"
                    size={24}
                    color={gStyles.azul[200]}
                  />
                </InputIcon>
              </View>
            </View>

            <View style={style.btnContainer}>
              <View style={style.btnWrapper}>
                <TextButton
                  theme="primary"
                  title="Cadastrar"
                  onPress={handleCadastro}
                />
              </View>

              <View style={style.btnWrapper}>
                <TextButton
                  theme="secondary"
                  title="Já tenho login"
                  onPress={() => router.navigate("/login")}
                />
              </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
              <Pressable onPress={() => router.navigate("/cadastro")}>
                <Text style={{ color: gStyles.azul[200], fontWeight: '600', fontSize: 14 }}>
                  Deseja cadastrar como Artista? Clique aqui
                </Text>
              </Pressable>
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}