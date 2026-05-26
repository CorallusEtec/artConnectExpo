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
import { AuthService } from "@/services/AuthService";

export default function CadastroContratante() {
  const [isEmpresa, setIsEmpresa] = useState(true);
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [erro, setErro] = useState("");

  const handleCadastro = async () => {
    try {
      const body = {
        nome,
        email,
        senha,
        confirmaSenha,
        razaoSocial: isEmpresa ? razaoSocial : null,
        cnpj: isEmpresa ? cnpj : null,
        cpf: null,
        tipo: isEmpresa ? ("CONTRATANTE_CNPJ" as const) : ("CONTRATANTE_CPF" as const),
      };

      const validacao = ContratanteService.validarCadastro(body);

      if (!validacao.valido) {
        setErro(validacao.mensagem);
        return;
      }

      await AuthService.register({
        nome,
        email,
        senha,
        tipoConta: body.tipo,
        cnpj,
        razaoSocial
      });


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
          onPress={() => router.navigate("/cadastro")}
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
          <View style={{ gap: 15 }}>
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
                    Conta Empresa
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
                    Conta Padrão
                  </Text>
                </Pressable>
              </View>
            </View>
            {erro ? (
              <Text style={{ color: "red", textAlign: "center" }}>
                {erro}
              </Text>
            ) : null}

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

                {isEmpresa && (
                <View style={style.inputWrapper}>
                  <Text style={style.label}> CNPJ </Text>
                  <InputIcon
                    placeholder="Digite o CNPJ"
                    onChangeText={setCnpj}
                    value={cnpj}
                  >
                    <FontAwesome
                      name="id-card"
                      size={24}
                      color={gStyles.azul[200]}
                    />
                  </InputIcon>
                </View>
              )}
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