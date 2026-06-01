import { Header } from "@/components/Header";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import {
  StatusBar,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export default function HomeLayout() {
  return (
    <>
      <StatusBar hidden />
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
          name="notify/index"
          options={{
            title: "Notificações",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="bell" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create/index"
          options={{
            title: "Criar",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="plus" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search/index"
          options={{
            title: "Pesquisar",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            headerShown: false,
            title: "Perfil",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile/editar/index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="[id]/index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
