import { AvatarRender } from "@/components";
import { DialogToLogin } from "@/components/Cadastro/DialogToLogin";
import { FormButton } from "@/components/Form";
import { useCadastro } from "@/contexts/CadastroContext";
import { schema } from "@/schemas/cadastroEndereco";
import { useCadastroMutate } from "@/services/AuthService";
import { ArtistaColorTheme, ContratanteColorTheme } from "@/style/appTheme";
import { style } from "./style";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button, MD3LightTheme, PaperProvider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";
import { EnderecoForm } from "./EnderecoForm";
import { FotoModal } from "./FotoModal";

export default function Usuario() {
  const [fotoModalVisible, setFotoModalVisible] = useState(false);
  const { cadastroRequest, fotoPerfil } = useCadastro();
  const { mutate, isPending, isSuccess } = useCadastroMutate();
  const [imagem, setImagem] = useState<ImagePicker.ImagePickerResult>({} as ImagePicker.ImagePickerResult);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  function pegarImagem() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    }).then((result) => {
      if (!result.canceled) setImagem(result);
    });
  }

  function proximaEtapa() {
    if (cadastroRequest.current.tipoConta == "CONTRATANTE") {
      const formData = new FormData();
      if (fotoPerfil.current) {
        formData.append("fotoPerfil", fotoPerfil.current as unknown as Blob);
      }
      formData.append("principal", JSON.stringify(cadastroRequest.current));
      mutate(formData);
    } else {
      router.navigate("/cadastroArtista");
    }
  }

  function finalizarCadastro(data: z.infer<typeof schema>) {
    if (imagem.assets) {
      fotoPerfil.current = {
        name: imagem.assets[0].fileName || "foto_perfil",
        type: imagem.assets[0].mimeType || "image/jpeg",
        uri: imagem.assets[0].uri,
      };
    }
    cadastroRequest.current = {
      ...cadastroRequest.current,
      details: {
        ...cadastroRequest.current.details,
        nomeLog: data.logradouro,
        numLog: data.numLog,
        cep: data.cep,
        bairro: data.bairro,
        complemento: data.complemento,
        cidade: data.cidade,
        uf: data.uf,
      },
    };
    proximaEtapa();
  }

  const isArtista = cadastroRequest.current.tipoConta === "ARTISTA";
  const localTheme = {
    ...MD3LightTheme,
    colors: {
      ...(isArtista ? ArtistaColorTheme : ContratanteColorTheme).colors,
    },
  };

  const dynamicStyles = {
    title: { color: localTheme.colors.primary, fontWeight: "600" as const },
  };

  return (
    <PaperProvider theme={localTheme}>
      <SafeAreaView style={style.container}>
        <KeyboardAvoidingView behavior="padding">
          <DialogToLogin visible={isSuccess} />
          <View style={style.titleContainer}>
            <Text variant="headlineMedium" style={dynamicStyles.title}>
              Complete seu perfil
            </Text>
            <Text variant="bodyMedium">
              Complete seu perfil para ter mais visibilidade.
            </Text>
            <Button onPress={proximaEtapa} mode="text" textColor={localTheme.colors.primary}>
              Agora Não
            </Button>
          </View>

          <ScrollView>
            <View style={style.avatarViewContainer}>
              <AvatarRender
                uri={imagem.assets == null ? undefined : imagem.assets[0].uri}
                nome={cadastroRequest.current.nome}
                size={75}
              />
              <View style={style.avatarActionsContainer}>
                <Button mode="text" icon="camera" onPress={() => setFotoModalVisible(true)}>
                  Alterar foto
                </Button>
              </View>
            </View>

            <EnderecoForm control={control} errors={errors} />

            <View style={style.btnGroup}>
              <FormButton
                style={style.button}
                onPress={handleSubmit(finalizarCadastro)}
                mode="contained"
                title="Finalizar Cadastro"
              />
            </View>
          </ScrollView>

          <FotoModal
            visible={fotoModalVisible}
            imagem={imagem}
            onDismiss={() => setFotoModalVisible(false)}
            onPegarImagem={() => { setFotoModalVisible(false); pegarImagem(); }}
            onExcluir={() => { setImagem({} as ImagePicker.ImagePickerResult); setFotoModalVisible(false); }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
}