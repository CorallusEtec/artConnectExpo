import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Minutos
    },
  },
});

export default function RootLayout() {
  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
    },
  };
  // LOGICA DE PROTEÇÃO DAS ROTAS DE LOGIN E HOME
  // SE EXISTE NO ASYNC STORAGE, LIBERA (home) E DESATIVA /login
  // SE NÃO, ATIVA /login E DESATIVA (home)

  const existsAccount = { exists: true };

  return (
    <QueryClientProvider client={client}>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            statusBarHidden: true,
            headerTitle: "",
            headerTransparent: true,
            headerBackButtonDisplayMode: "minimal",
          }}
        >
          <Stack.Protected guard={existsAccount.exists}>
            <Stack.Screen name="(home)" />
          </Stack.Protected>
          <Stack.Protected guard={!existsAccount.exists}>
            <Stack.Screen name="(public)" />
          </Stack.Protected>
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}
