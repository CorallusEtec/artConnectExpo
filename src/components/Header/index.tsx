import { useAuth } from "@/contexts";
import { router } from "expo-router";
import { useState } from "react";
import { Image, View, ViewProps } from "react-native";
import { IconButton } from "react-native-paper";
import { ModalSettings } from "../ModalSettings";
import { style } from "./style";

export type HeaderProps = ViewProps & {};

const BANNER_AZUL = require("@/assets/img/banner.png");
const BANNER_VERMELHO = require("@/assets/img/banner-vermelho.png");

export function Header() {
  const { isAuth, getTipoConta } = useAuth();
  const [modalConfig, setModalConfig] = useState(false);
  const banner =
    getTipoConta() === "CONTRATANTE" ? BANNER_VERMELHO : BANNER_AZUL;

  return (
    <View style={style.navbar}>
      <Image style={style.banner} source={banner} />

      <View style={style.actionsContainer}>
        {!isAuth && (
          <IconButton
            icon="logout"
            onPress={() => router.dismissTo("/login")}
          />
        )}
      </View>
      <IconButton
        icon="cog-outline"
        size={30}
        onPress={() => setModalConfig(true)}
      />
      {/* Modal de configurações do aplicativo */}
      <ModalSettings
        modalConfig={modalConfig}
        setModalConfig={setModalConfig}
      />
    </View>
  );
}
