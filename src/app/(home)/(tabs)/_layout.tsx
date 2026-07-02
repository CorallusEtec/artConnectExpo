import { useAuth } from "@/contexts/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { memo } from "react";
import {
  StatusBar,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "react-native-paper";

const TabIcon = memo(({ name, color }: { name: any; color: string }) => {
  return <FontAwesome name={name} color={color} size={20} />;
});

// LÓGICA PARA SABER SE ESTÁ AUTENTICADO
// SE O USUARIO TEM ROLE DE USUARIO (CONTA DE VERDADE)
// LIBERA TODAS AS ROTAS
// SE NÃO (se for convidado), LIBERA APENAS O FEED E PESQUISAR

// Esconder barra de gestos do android

export default function TabLayout() {
  const { isAuth } = useAuth();

  const theme = useTheme();
  return (
    <>
      <StatusBar hidden />
      <Tabs
        detachInactiveScreens={true}
        initialRouteName="home"
        backBehavior="initialRoute"
        screenOptions={{
          headerShown: false,
          animation: "shift",
          lazy: true,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
          tabBarButton: (props) => (
            <TouchableOpacity {...(props as TouchableOpacityProps)} />
          ),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Pesquisar",
            tabBarIcon: ({ color }) => <TabIcon name="search" color={color} />,
          }}
        />

        <Tabs.Protected guard={isAuth}>
          <Tabs.Screen
            name="create"
            options={{
              title: "Criar",
              tabBarIcon: ({ color }) => <TabIcon name="plus" color={color} />,
            }}
          />

          <Tabs.Screen
            name="notify"
            options={{
              title: "Notificações",
              href: null, // Para essa prévia
              //tabBarIcon: ({ color }) => <TabIcon name="bell" color={color} />,
            }}
          />
          <Tabs.Screen
            name="perfil"
            options={{
              title: "Perfil",
              tabBarIcon: ({ color }) => <TabIcon name="user" color={color} />,
            }}
          />
          <Tabs.Screen
            name="contacts"
            options={{
              animation: "shift",
              title: "Contatos",
              tabBarIcon: ({ color }) => (
                <TabIcon name="envelope" color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="[id]"
            options={{
              animation: "shift",
              href: null,
            }}
          />
        </Tabs.Protected>
      </Tabs>
    </>
  );
}
