import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import ArtistaService from "@/services/ArtistaService";
import { AuthService } from "@/services/AuthService";
import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/(cadastro)/cadastro";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cadastro() {
  const [erro, setErro] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Masculino", value: "m" },
    { label: "Feminino", value: "f" },
    { label: "Não binário", value: "n" },
    { label: "Prefiro não informar", value: "" },
  ]);

  const handleCadastro = async () => {
    try {
      const body = {
        nome,
        email,
        senha,
        confirmaSenha,
      };
      const validacao = ArtistaService.validarCadastro(body);

      if (!validacao.valido) {
        setErro(validacao.mensagem);
        return;
      }
      await AuthService.register({
        email,
        nome,
        senha,
        tipoConta: "ARTISTA",
      });
      router.navigate("/login");
    } catch (err) {
      console.log("Erro cadastro: ", err);
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
          <Text style={style.titulo}> Cadastre-se </Text>
        </View>
        {erro ? (
          <Text style={{ color: "red", textAlign: "center" }}>{erro}</Text>
        ) : null}

        <ScrollView>
          <View style={{ gap: 20 }}>
            <View style={[style.inputContainer, open && { marginBottom: 100 }]}>
              <View style={style.inputWrapper}>
                <InputIcon
                  label="Nome"
                  placeholder="Digite seu nome"
                  onChangeText={setNome}
                  value={nome}
                  icon="account-outline"
                />
              </View>

              <View style={style.inputWrapper}>
                <InputIcon
                  label="Email"
                  placeholder="Digite seu email"
                  onChangeText={setEmail}
                  value={email}
                  icon="email-outline"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={style.inputWrapper}>
                <InputSenha
                  label="Senha"
                  placeholder="Crie sua senha"
                  onChangeText={setSenha}
                  value={senha}
                />
              </View>

              <View style={style.inputWrapper}>
                <InputSenha
                  label="Confirmar Senha"
                  placeholder="Digite a senha novamente"
                  onChangeText={setConfirmaSenha}
                  value={confirmaSenha}
                />
              </View>

              <View>
                <Text style={style.label}> Selecione seu gênero </Text>

                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  listMode="SCROLLVIEW"
                  style={style.picker}
                  maxHeight={100}
                  placeholder="Selecione um gênero"
                  dropDownContainerStyle={{
                    width: "100%",
                    backgroundColor: gStyles.cinza[200],
                    borderColor: gStyles.cinza[200],
                  }}
                />
              </View>
            </View>

            {/* botoes */}
            <View style={style.btnContainer}>
              <View style={style.btnWrapper}>
                <TextButton
                  variant="primary"
                  title="Cadastrar"
                  onPress={handleCadastro}
                />
              </View>

              <View style={style.btnWrapper}>
                <TextButton
                  variant="secondary"
                  title="Já tenho login"
                  onPress={() => router.navigate("/login")}
                />
              </View>
            </View>
            <View
              style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}
            >
              <Pressable
                onPress={() => router.navigate("/cadastro/contratante")}
              >
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
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
