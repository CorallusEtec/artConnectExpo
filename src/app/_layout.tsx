import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
  },
};
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Minutos
    },
  },
});
// LOGICA DE PROTEÇÃO DAS ROTAS DE LOGIN E HOME
// SE EXISTE NO ASYNC STORAGE, LIBERA (home) E DESATIVA /login
// SE NÃO, ATIVA /login E DESATIVA (home)

const existsAccount = true;
export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            statusBarHidden: true,
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
            <Stack.Screen name="login" />
          </Stack.Protected>
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}
