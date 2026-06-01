import { gStyles } from "@/style/gStyle";
import { AntDesign } from "@expo/vector-icons";
import { Image, TouchableOpacity, View, ViewProps } from "react-native";
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
        <TouchableOpacity>
          <AntDesign name="message" color={gStyles.cinza[600]} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
