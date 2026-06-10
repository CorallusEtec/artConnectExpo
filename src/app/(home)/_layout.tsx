import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { memo } from "react";
import {
  StatusBar,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabIcon = memo(({ name, color }: { name: any; color: string }) => {
  return <FontAwesome name={name} color={color} size={20} />;
});

// LÓGICA PARA SABER SE ESTÁ AUTENTICADO
// SE O USUARIO TEM ROLE DE USUARIO (CONTA DE VERDADE)
// LIBERA TODAS AS ROTAS
// SE NÃO (se for convidado), LIBERA APENAS O FEED E PESQUISAR

// Esconder barra de gestos do android

export default function HomeLayout() {
  const { token } = useAuth();
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar hidden />
      <Tabs
        detachInactiveScreens={true}
        initialRouteName="home"
        backBehavior="initialRoute"
        screenOptions={{
          header: () => <Header />,
          lazy: true,
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

        <Tabs.Protected guard={token?.token != null}>
          <Tabs.Screen
            name="(private)/create"
            options={{
              title: "Criar",
              tabBarIcon: ({ color }) => <TabIcon name="plus" color={color} />,
            }}
          />
          <Tabs.Screen
            name="(private)/notify"
            options={{
              title: "Notificações",
              tabBarIcon: ({ color }) => <TabIcon name="bell" color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Perfil",
              tabBarIcon: ({ color }) => <TabIcon name="user" color={color} />,
            }}
          />
        </Tabs.Protected>

        <Tabs.Screen
          name="(private)/edit"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
