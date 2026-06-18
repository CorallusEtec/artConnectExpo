import { AvatarRender } from "@/components";
import { DialogToLogin } from "@/components/Cadastro/DialogToLogin";
import { FormInput } from "@/components/Form";
import { useCadastro } from "@/contexts/CadastroContext";
import { schema } from "@/schemas/cadastroEndereco";
import { useCadastroMutate } from "@/services/AuthService";
import { style } from "@/style/pages/cadastroDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
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
      quality: 1,
    }).then((result) => {
      console.log(result);
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
  console.log(error);
  function finalizarCadastro(data: z.infer<typeof schema>) {
    // Fazer cadastro normalmente
    if (imagem.assets) {
      fotoPerfil.current = {
        name: imagem.assets[0].fileName || "foto_perfil",
        type: imagem.assets[0].type || "image/jpeg",
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

  return (
    <KeyboardAvoidingView behavior="padding" style={style.container}>
      <DialogToLogin visible={isSuccess} />
      <View style={style.titleContainer}>
        <Text variant="headlineSmall">
          Bem vindo(a), {cadastroRequest.current.nome}
        </Text>
        <Text variant="bodyMedium">
          Complete seu perfil para ter mais visibilidade.
        </Text>
        <Button onPress={proximaEtapa} mode="text">
          Agora Não
        </Button>
      </View>

      <ScrollView>
        <View style={style.avatarViewContainer}>
          <View style={style.avatarContainer}>
            <Text variant="bodyLarge">Imagem de Perfil</Text>
            <AvatarRender
              uri={imagem.assets == null ? undefined : imagem.assets[0].uri}
              nome={cadastroRequest.current.nome}
            />
          </View>
          <View style={style.avatarActionsContainer}>
            <IconButton
              iconColor="red"
              icon="delete"
              onPress={() => setImagem({} as ImagePicker.ImagePickerResult)}
            />
            <IconButton
              icon="image-edit-outline"
              onPress={() => pegarImagem()}
            />
          </View>
        </View>

        <View style={style.enderencoContainer}>
          <Text variant="bodyLarge">Endereço</Text>
          <Controller
            name="logradouro"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Logradouro *"
                placeholder="Digite seu logradouro"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                inputMode="text"
                icon="home-outline"
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
                  style={{ width: "65%" }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  inputMode="numeric"
                  icon="mailbox"
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
                  style={{ width: "30%" }}
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(Number(text))}
                  inputMode="numeric"
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
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
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
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                inputMode="text"
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
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                inputMode="text"
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
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                inputMode="text"
                error={!!errors.uf}
              />
            )}
          />
        </View>

        <View style={style.actionsContainer}>
          <Button
            style={{ marginLeft: 10 }}
            mode="contained"
            disabled={isPending}
            loading={isPending}
            onPress={handleSubmit(finalizarCadastro)}
          >
            {cadastroRequest.current.tipoConta == "ARTISTA"
              ? "Próxima etapa"
              : "Finalizar cadastro"}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
