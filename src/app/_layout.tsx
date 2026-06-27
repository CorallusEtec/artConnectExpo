import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { getThemeByTipoConta } from "@/style/appTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

export function NavigationLayout() {
  const { isLoading, isAuth, getTipoConta } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const theme = {
    ...MD3LightTheme,
    colors: {
      ...getThemeByTipoConta(getTipoConta()).colors,
    },
  };

  return (
    <PaperProvider theme={theme}>
      <Stack
        initialRouteName={!isAuth ? "(public)/login" : undefined}
        screenOptions={{
          statusBarHidden: true,
          header: () => null,
          headerBackButtonDisplayMode: "minimal",
        }}
      >
        <Stack.Protected guard={isAuth === true}>
          <Stack.Screen name="(home)" />
        </Stack.Protected>

        <Stack.Protected guard={isAuth === false}>
          <Stack.Screen name="(public)" />
        </Stack.Protected>
      </Stack>
    </PaperProvider>
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
  // LOGICA DE PROTEÇÃO DAS ROTAS DE LOGIN E HOME
  // SE EXISTE NO ASYNC STORAGE, LIBERA (home) E DESATIVA /login
  // SE NÃO, ATIVA /login E DESATIVA (home)

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <PaperProvider>
          <NavigationLayout />
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
