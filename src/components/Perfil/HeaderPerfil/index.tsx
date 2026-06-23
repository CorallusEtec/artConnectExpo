import { usePerfil } from "@/contexts/PerfilContext";
import { router } from "expo-router";
import { Appbar, useTheme } from "react-native-paper";
import { style } from "./style";

export function HeaderPerfil() {
  const { setModalConfig } = usePerfil();
  const theme = useTheme();

  return (
    <Appbar.Header style={[style.navbar, {backgroundColor: theme.colors.primary}]}>
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
