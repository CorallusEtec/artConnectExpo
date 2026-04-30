import { TabAction } from "@/components/TabAction";
import { Tabs } from "@/components/Tabs";
import { useAuthStore } from "@/store";
import { router, Slot, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  const usuario = useAuthStore((state) => state.usuario);
  const pathName = usePathname();

  function protecaoTela() {
  if (!usuario) {
    router.navigate("/login");
    return;
  }

  router.navigate("/home/create");
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
      <Tabs>
        <TabAction
          onPress={() => router.navigate("/home")}
          active={pathName == "/home"}
          iconName="home"
        />
        <TabAction
          onPress={() => router.navigate("/home/notify")}
          active={pathName == "/home/notify"}
          iconName="bell"
        />
        <TabAction
          onPress={protecaoTela}
          active={pathName == "/home/create"} 
          iconName="plus" 
        />
        <TabAction active={pathName == "/home/search"} iconName="search" />
        <TabAction
          onPress={() => router.navigate("/home/perfil")} 
          active={pathName == "/home/profile"}
          iconName="user"
        />
      </Tabs>
    </SafeAreaView>
  );
}