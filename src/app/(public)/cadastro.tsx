import { AlertMessage } from "@/components/AlertMessage";
import { BannerLogo } from "@/components/BannerLogo";
import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import { schema } from "@/schemas/cadastroSchema";
import { AuthService } from "@/services/AuthService";
import { style } from "@/style/pages/cadastro";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, Dialog, Portal, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [isArtista, setArtista] = useState(false);
  const errorMessage = useRef("");
  const [alert, setAlert] = useState(false);

  const [dialog, setDialog] = useState(false);

  function avancar() {
    const valido = schema.safeParse({ nome, email, senha });

    if (!valido.success) {
      errorMessage.current = valido.error.issues[0].message;
      setAlert(true);
    } else {
      AuthService.register({
        nome,
        email,
        senha,
        tipoConta: isArtista ? "ARTISTA" : "CONTRATANTE",
      });

      setDialog(true);
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Portal>
        <Dialog visible={dialog}>
          <Dialog.Title>Cadastro</Dialog.Title>
          <Dialog.Content>
            <Text>
              Conta criada com sucesso! Agora você pode logar e entrar no Art
              Connect
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => router.back()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <AlertMessage
        onDismiss={() => setAlert(false)}
        visible={alert}
        text={errorMessage.current}
      />
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
          <View style={style.inputContainer}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              Criar conta como: {isArtista ? "Artista" : "Contratante"}
            </Text>
            <Switch
              value={isArtista}
              onValueChange={() => setArtista((prev) => !prev)}
            />
          </View>
          {/* botoes */}
          <View style={style.btnContainer}>
            <View style={style.btnGroup}>
              <TextButton
                onPress={() => avancar()}
                variant="primary"
                title="Cadastrar"
              />
              <TextButton
                variant="secondary"
                title="Já tenho login"
                onPress={() => router.back()}
              />
            </View>
          </View>
          <View
            style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}
          ></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
