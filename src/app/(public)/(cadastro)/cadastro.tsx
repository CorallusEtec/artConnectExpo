import { BannerLogo } from "@/components";
import {
  FormButton,
  FormHelperText,
  FormInput,
  FormPassInput,
} from "@/components/Form";
import { useCadastro } from "@/contexts/CadastroContext";
import { AuthRegisterRequest } from "@/models/request/AuthRegisterRequest";
import { schema } from "@/schemas/cadastroSchema";
import { ArtistaColorTheme, ContratanteColorTheme } from "@/style/appTheme";
import { style } from "@/style/pages/cadastro";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { Divider, MD3LightTheme, PaperProvider, Switch, Text } from "react-native-paper";
import z from "zod";

export default function Cadastro() {
  /** Controle de formulário e validações */
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      isArtista: false,
    },
  });

  // Observa o valor do switch em tempo real para trocar o tema
  const isArtista = useWatch({ control, name: "isArtista" });

  const localTheme = {
    ...MD3LightTheme,
    colors: {
      ...(isArtista ? ArtistaColorTheme : ContratanteColorTheme).colors,
    },
  };

  const { cadastroRequest } = useCadastro();
  const onSubmit = (data: z.infer<typeof schema>) => {
    cadastroRequest.current = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      tipoConta: data.isArtista ? "ARTISTA" : "CONTRATANTE",
    } as AuthRegisterRequest;
    router.navigate("/cadastroDetails");
  };

  return (
    <PaperProvider theme={localTheme}>
      <StatusBar hidden />
      <KeyboardAvoidingView style={style.container} behavior="padding">
        <View style={style.titleContainer}>
          <BannerLogo size={60} />
          <Divider horizontalInset />
        </View>

        <ScrollView>
          <View style={style.formContainer}>
            {/* Tipo de Conta */}
            <Controller
              name="isArtista"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text variant="titleLarge">
                    Crie sua conta no Art Connect
                  </Text>
                  <View style={style.tipoContaGroup}>
                    <Text variant="bodyMedium">
                      Criar conta como:{" "}
                      {value ? "Artista" : "Contratante"}
                    </Text>
                    <Switch
                      onBlur={onBlur}
                      onValueChange={onChange}
                      value={value}
                    />
                  </View>
                </>
              )}
            />

            {/* Inputs */}
            <View style={style.inputGroup}>
              <Controller
                name="nome"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <>
                    <FormInput
                      label="Nome *"
                      placeholder="Digite seu nome"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      inputMode="text"
                      icon="account-outline"
                      error={!!errors.nome}
                    />
                    <FormHelperText visible={!!errors.nome}>
                      {errors.nome?.message}
                    </FormHelperText>
                  </>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <FormInput
                      label="Email *"
                      placeholder="Digite seu email"
                      icon="email-outline"
                      inputMode="email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={!!errors.email}
                    />
                    <FormHelperText padding="none" visible={!!errors.email}>
                      {errors.email?.message}
                    </FormHelperText>
                  </>
                )}
              />
              <Controller
                name="senha"
                control={control}
                render={({ field: { value, onBlur, onChange } }) => (
                  <>
                    <FormPassInput
                      label="Senha *"
                      placeholder="Crie sua senha"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={!!errors.senha}
                    />
                    <FormHelperText visible={!!errors.senha}>
                      {errors.senha?.message}
                    </FormHelperText>
                  </>
                )}
              />
              <Controller
                name="senhaConfirm"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <>
                    <FormPassInput
                      label="Confirmar Senha *"
                      placeholder="Confirme a senha"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={!!errors.senhaConfirm}
                    />
                    <FormHelperText visible={!!errors.senhaConfirm}>
                      {errors.senhaConfirm?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </View>
            {/* Botões */}
            <View style={style.btnGroup}>
              <FormButton
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                title="Cadastrar"
              />
              <FormButton
                mode="outlined"
                title="Já tenho login"
                onPress={() => router.back()}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}