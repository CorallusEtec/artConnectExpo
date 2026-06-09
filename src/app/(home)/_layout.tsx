import { Header } from "@/components/Header";
import { FontAwesome } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from "expo-router";
import { memo } from "react";
import {
  StatusBar,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const TabIcon = memo(({ name, color }: { name: any; color: string }) => {
  return <FontAwesome name={name} color={color} size={20} />;
});

// LÓGICA PARA SABER SE ESTÁ AUTENTICADO
// SE O USUARIO TEM ROLE DE USUARIO (CONTA DE VERDADE)
// LIBERA TODAS AS ROTAS
// SE NÃO (se for convidado), LIBERA APENAS O FEED E PESQUISAR
const guest = true;

// Esconder barra de gestos do android

export default function HomeLayout() {
  NavigationBar.setBehaviorAsync("overlay-swipe");
  NavigationBar.setVisibilityAsync("hidden");
  return (
    <>
      <StatusBar hidden />
      <Tabs
        detachInactiveScreens={true}
        initialRouteName="index"
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
          name="index"
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

        <Tabs.Protected guard={!guest}>
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
            name="(private)/profile"
            options={{
              headerShown: false,
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
