import { router } from "expo-router";
import { Image, View, ViewProps } from "react-native";
import { IconButton } from "react-native-paper";
import { style } from "./style";

export type HeaderProps = ViewProps & {};

export function Header() {
  return (
    <View style={style.navbar}>
      <Image style={style.banner} source={require("@/assets/img/banner.png")} />
      <View
        style={{
          flexDirection: "row",
          gap: 16,
        }}
      >
        <IconButton
          icon="message-text-outline"
          onPress={() => router.push("/chat/contacts")}
        />
      </View>
    </View>
  );
}
