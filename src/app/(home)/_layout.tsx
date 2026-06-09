import { Header } from "@/components/Header";
import { FontAwesome } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from "expo-router";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

// LÓGICA PARA SABER SE ESTÁ AUTENTICADO
// SE O USUARIO TEM ROLE DE USUARIO (CONTA DE VERDADE)
// LIBERA TODAS AS ROTAS
// SE NÃO (se for convidado), LIBERA APENAS O FEED E PESQUISAR
const guest = true;

// Esconder barra de gestos do android
NavigationBar.setVisibilityAsync("hidden");
NavigationBar.setBehaviorAsync("overlay-swipe");

export default function HomeLayout() {
  return (
    <>
      <Tabs
        initialRouteName="home"
        backBehavior="initialRoute"
        screenOptions={{
          header: () => <Header />,

          tabBarButton: (props) => (
            <TouchableOpacity {...(props as TouchableOpacityProps)} />
          ),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Pesquisar",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Protected guard={!guest}>
          <Tabs.Screen
            name="(private)/create"
            options={{
              title: "Criar",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="plus" size={20} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(private)/notify"
            options={{
              title: "Notificações",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="bell" size={20} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(private)/profile"
            options={{
              headerShown: false,
              title: "Perfil",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="user" size={20} color={color} />
              ),
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
