import { TabAction } from "@/components/TabAction";
import { Tabs } from "@/components/Tabs";
import { router, Slot, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  const pathName = usePathname();
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
          onPress={() => router.navigate("/home/create")}
          active={pathName == "/home/create"}
          iconName="plus" />
        <TabAction
          onPress={() => router.push("/search" as any)}
          active={pathName == "/home/search"}
          iconName="search"
        />
        <TabAction
          onPress={() => router.navigate("/home/perfil")}
          active={pathName == "/home/profile"}
          iconName="user"
        />
      </Tabs>
    </SafeAreaView>
  );
}