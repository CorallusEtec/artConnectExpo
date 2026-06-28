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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { MD3LightTheme, PaperProvider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";

export default function Cadastro() {
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

  const dynamicStyles = {
    appTitle: {
      fontWeight: "bold" as const,
      color: localTheme.colors.primary,
    },
    tipoContaOptionSelected: {
      borderColor: localTheme.colors.primary,
      backgroundColor: localTheme.colors.primaryContainer,
    },
    optionTextSelected: {
      color: localTheme.colors.primary,
      fontWeight: "600" as const,
    },
    loginLink: {
      color: localTheme.colors.primary,
      fontWeight: "bold" as const,
    },
  };

  return (
    <PaperProvider theme={localTheme}>
      <StatusBar hidden />
      <KeyboardAvoidingView style={style.container} behavior="padding">
        <SafeAreaView style={style.scrollContent}>
        <ScrollView >
          
            <BannerLogo size={'8%'}/>

          <View style={style.formContainer}>
            <Text variant="headlineSmall" style={style.pageTitle}>
              Criar conta
            </Text>
            <Text variant="bodyMedium" style={style.subtitle}>
              Cadastre-se para começar a contratar e divulgar arte.
            </Text>

            <View style={style.tipoContaContainer}>
              <Text variant="bodyMedium" style={style.tipoContaLabel}>
                Como deseja usar o app?
              </Text>
              
              <Controller
                name="isArtista"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={style.tipoContaOptions}>
                    <TouchableOpacity
                      style={[
                        style.tipoContaOption,
                        !value && dynamicStyles.tipoContaOptionSelected,
                      ]}
                      onPress={() => onChange(false)}
                    >
                      <View style={style.tipoContaContent}>
                        <MaterialCommunityIcons
                          name={!value ? "radiobox-marked" : "radiobox-blank"}
                          size={20}
                          color={!value ? localTheme.colors.primary : "#9B9B9B"}
                        />

                        <Text
                          style={
                            !value
                              ? dynamicStyles.optionTextSelected
                              : style.optionText
                          }
                        >
                          Contratante
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        style.tipoContaOption,
                        value && dynamicStyles.tipoContaOptionSelected,
                      ]}
                      onPress={() => onChange(true)}
                    >
                      <View style={style.tipoContaContent}>
                        <MaterialCommunityIcons
                          name={value ? "radiobox-marked" : "radiobox-blank"}
                          size={20}
                          color={value ? localTheme.colors.primary : "#9B9B9B"}
                        />

                        <Text
                          style={
                            value
                              ? dynamicStyles.optionTextSelected
                              : style.optionText
                          }
                        >
                          Artista
                        </Text>
                      </View>
                    </TouchableOpacity>
                    
                  </View>
                )}
              />
            </View>

            <View>
              <Controller
                name="nome"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <>
                    <FormInput
                      style={style.input}
                      label="Nome"
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
                      style={style.input}
                      label="Email"
                      placeholder="Digite seu e-mail"
                      icon="email-outline"
                      inputMode="email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={!!errors.email}
                    />
                    <FormHelperText visible={!!errors.email}>
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
                      style={style.input}
                      label="Senha"
                      placeholder="Digite sua senha"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={!!errors.senha}
                    />
                    <Text variant="bodySmall" style={style.senhaHelper}>
                      Mínimo de 6 caracteres.
                    </Text>
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
                      style={style.input}
                      label="Confirmar senha"
                      placeholder="Confirmar sua senha"
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

            <View style={style.btnGroup}>
              <FormButton
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                title="Cadastrar"
              />
            </View>

          <View style={style.linhaOuWrapper}>
            <View style={style.linhaOu} />
            <Text style={style.textoOu}>ou</Text>
            <View style={style.linhaOu} />
          </View>

          <View style={style.loginContainer}>
            <Text variant="bodyMedium" style={style.loginText}>
              Já possui uma conta?
            </Text>

            <TouchableOpacity onPress={() => router.back()}>
              <Text variant="bodyMedium" style={dynamicStyles.loginLink}>
                Entrar
              </Text>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}