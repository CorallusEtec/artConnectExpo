import { useAuth } from "@/contexts";
import { router } from "expo-router";
import { Image, View, ViewProps } from "react-native";
import { IconButton } from "react-native-paper";
import { style } from "./style";

export type HeaderProps = ViewProps & {};

const BANNER_AZUL = require("@/assets/img/banner.png");
const BANNER_VERMELHO = require("@/assets/img/banner-vermelho.png");

export function Header() {
  const { isAuth, getTipoConta } = useAuth();
  const banner = getTipoConta() === "CONTRATANTE" ? BANNER_VERMELHO : BANNER_AZUL;

  return (
    <View style={style.navbar}>
      <Image style={style.banner} source={banner} />

      <View style={style.actionsContainer}>
        {!isAuth ? (
          <IconButton
            icon="logout"
            onPress={() => router.dismissTo("/login")}
          />
        ) : (
          <IconButton
            icon="message-text-outline"
            onPress={() => router.push("/chat/contacts")}
          />
        )}
      </View>
    </View>
  );
}