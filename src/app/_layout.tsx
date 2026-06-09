import { Stack } from "expo-router";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
export default function RootLayout() {
  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
    },
  };

  // LOGICA DE PROTEÇÃO DAS ROTAS DE LOGIN E HOME
  // SE EXISTE NO ASYNC STORAGE, LIBERA (home) E DESATIVA (public)
  // SE NÃO ATIVA (public) PARA LOGIN OU CADASTRO E DESATIVA (home)

  const existsAccount = false;
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          statusBarStyle: "inverted",
          headerTitle: "",
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
          contentStyle: { marginBottom: 50 },
        }}
      >
        <Stack.Protected guard={existsAccount}>
          <Stack.Screen name="(home)" />
        </Stack.Protected>
        <Stack.Protected guard={!existsAccount}>
          <Stack.Screen name="(public)" />
        </Stack.Protected>
      </Stack>
    </PaperProvider>
  );
}
