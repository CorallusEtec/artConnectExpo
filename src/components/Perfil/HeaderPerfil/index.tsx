import { usePerfil } from "@/contexts/PerfilContext";
import { router } from "expo-router";
import { Appbar } from "react-native-paper";
import { style } from "./style";

export function HeaderPerfil() {
  const { setModalConfig } = usePerfil();

  return (
    <Appbar.Header style={style.navbar}>
      <Appbar.Action
        icon="arrow-left"
        size={34}
        onPress={router.back}
        color="white"
      />
      <Appbar.Content titleStyle={{ color: "white" }} title="Seu Perfil" />
      <Appbar.Action
        icon="cog"
        color="white"
        size={30}
        onPress={() => setModalConfig(true)}
      />
    </Appbar.Header>
  );
}
