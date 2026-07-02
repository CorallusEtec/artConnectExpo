import { BannerLogo } from "@/components";
import { FormButton } from "@/components/Form";
import { useCadastro } from "@/contexts/CadastroContext";
import { AuthRegisterRequest } from "@/models/request/AuthRegisterRequest";
import { schema } from "@/schemas/cadastroSchema";
import { ArtistaColorTheme, ContratanteColorTheme } from "@/style/appTheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, StatusBar, View } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";
import { style } from "./style";
import { Header } from "./Header";
import { TypeSelector } from "./TypeSelector";
import { FormFields } from "./FormFields";
import { LoginFooter } from "./LoginFooter";

export default function Cadastro() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { isArtista: false },
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
          <ScrollView>
            <BannerLogo size={'8%'} />
            <View style={style.formContainer}>
              <Header />
              <TypeSelector
                control={control}
                dynamicStyles={dynamicStyles}
                primaryColor={localTheme.colors.primary}
              />
              <FormFields control={control} errors={errors} />
              <View style={style.btnGroup}>
                <FormButton
                  style={style.button}
                  onPress={handleSubmit(onSubmit)}
                  mode="contained"
                  title="Cadastrar"
                />
              </View>
              <LoginFooter loginLink={dynamicStyles.loginLink} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}