import { AvatarRender } from "@/components";
import { DialogToLogin } from "@/components/Cadastro/DialogToLogin";
import { FormButton, FormInput } from "@/components/Form";
import { useCadastro } from "@/contexts/CadastroContext";
import { schema } from "@/schemas/cadastroEndereco";
import { useCadastroMutate } from "@/services/AuthService";
import { ArtistaColorTheme, ContratanteColorTheme } from "@/style/appTheme";
import { style } from "@/style/pages/cadastroDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { MD3LightTheme, PaperProvider } from "react-native-paper";

import z from "zod";

/**
 *
 * @returns Pagina de cadastro com detalhes adicionais
 *
 * Apos a previa do dia 18/06, esse código será refatorado para ficar mais limpo e organizado,
 * principalmente a parte do formulário, que tem muitos campos e pode ser dividido em componentes menores
 */
export default function Usuario() {
  const { cadastroRequest, fotoPerfil } = useCadastro();
  const { mutate, isPending, error, isSuccess } = useCadastroMutate();
  const [imagem, setImagem] = useState<ImagePicker.ImagePickerResult>(
    {} as ImagePicker.ImagePickerResult,
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function pegarImagem() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    }).then((result) => {
      if (!result.canceled) {
        setImagem(result);
      }
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
      // Ir para próxima etapa do cadastro de artista
      router.navigate("/cadastroArtista");
    }
  }
  function finalizarCadastro(data: z.infer<typeof schema>) {
    // Fazer cadastro normalmente
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
      ...(isArtista
        ? ArtistaColorTheme
        : ContratanteColorTheme).colors,
    },
  };

  const dynamicStyles = {
    title: {
      color: localTheme.colors.primary,
      fontWeight: "600" as const,
    },

    sectionTitle: {
      color: localTheme.colors.primary,
      fontWeight: "600" as const,
    },

    skipButton: {
      color: localTheme.colors.primary,
      fontWeight: "600" as const,
    },

    avatarEdit: {
      color: localTheme.colors.primary,
    },
  };

  return (
    <PaperProvider theme={localTheme}>
    <SafeAreaView style={style.container}>
    <KeyboardAvoidingView behavior="padding" >
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
            <IconButton
              size={25}
              iconColor="red"
              icon="delete"
              onPress={() => setImagem({} as ImagePicker.ImagePickerResult)}
            />
            <IconButton
              size={25}
              icon="image-edit-outline"
              onPress={() => pegarImagem()}
            />
          </View>
        </View>

        <View style={style.enderencoContainer}>
          <Text variant="bodyLarge" style={{fontWeight: 500}}>Endereço</Text>
          <Controller
            name="logradouro"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Logradouro *"
                placeholder="Digite seu logradouro"
                outlineStyle={{ borderRadius: 8 }}
                style={style.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                inputMode="text"
                icon="home"
                error={!!errors.logradouro}
              />
            )}
          />
          <View style={style.cepRow}>
            <Controller
              name="cep"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="CEP *"
                  placeholder="Digite seu CEP"
                  value={value}
                  outlineStyle={{ borderRadius: 8 }}
                  style={[style.input, { width: "65%" }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  inputMode="numeric"
                  icon="map-marker-radius-outline"
                  error={!!errors.cep}
                />
              )}
            />
            <Controller
              name="numLog"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="N° *"
                  value={value ? String(value) : ""}
                  outlineStyle={{ borderRadius: 8 }}
                  style={[style.input, { width: "30%" }]}
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(Number(text))}
                  inputMode="numeric"
                  icon="numeric"
                  error={!!errors.numLog}
                />
              )}
            />
          </View>

          <Controller
            name="complemento"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Complemento"
                placeholder="Apartamento, casa, etc"
                outlineStyle={{ borderRadius: 8 }}
                style={style.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                icon="office-building-outline"
                inputMode="text"
              />
            )}
          />

          <Controller
            name="bairro"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Bairro *"
                placeholder="Digite seu bairro"
                outlineStyle={{ borderRadius: 8 }}
                style={style.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                inputMode="text"
                icon="home-group"
                error={!!errors.bairro}
              />
            )}
          />
          <Controller
            name="cidade"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Cidade *"
                placeholder="Digite sua cidade"
                outlineStyle={{ borderRadius: 8 }}
                style={style.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                inputMode="text"
                icon="city-variant-outline"
                error={!!errors.cidade}
              />
            )}
          />
          <Controller
            name="uf"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="UF *"
                placeholder="Digite sua UF"
                outlineStyle={{ borderRadius: 8 }}
                style={style.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                inputMode="text"
                icon="map-outline"
                error={!!errors.uf}
              />
            )}
          />
        </View>

        <View style={style.btnGroup}>
          <FormButton
            style={style.button}
            onPress={handleSubmit(finalizarCadastro)}
            mode="contained"
            title="Finalizar Cadastro"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </PaperProvider>
  );
}
