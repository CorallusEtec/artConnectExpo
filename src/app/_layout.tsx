import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

export function NavigationLayout() {
  const { token, isLoading } = useAuth();
  console.log(useAuth());
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Stack
      screenOptions={{
        statusBarHidden: true,
        headerTitle: "",
        headerTransparent: true,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Protected guard={token != null}>
        <Stack.Screen name="(home)" />
      </Stack.Protected>

      <Stack.Protected guard={token == null}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}

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

  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <PaperProvider theme={theme}>
          <NavigationLayout />
        </PaperProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
