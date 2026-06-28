import { useAuth } from "@/contexts";
import { usePerfil } from "@/contexts/PerfilContext";
import { router } from "expo-router";
import { Appbar, Text, useTheme } from "react-native-paper";
import { style } from "./style";

export function HeaderPerfil() {
  const { setModalConfig, dataPerfil } = usePerfil();
  const { getValidateId } = useAuth();
  const theme = useTheme();

  return (
    <Appbar.Header
      style={[style.navbar, { backgroundColor: theme.colors.primary }]}
    >
      <Appbar.Action
        icon="arrow-left"
        size={34}
        onPress={router.back}
        color={theme.colors.onPrimary}
      />
      <Appbar.Content
        title={
          <Text
            numberOfLines={1}
            style={[style.title, { color: theme.colors.onPrimary }]}
            variant="titleMedium"
          >
            {dataPerfil?.id == getValidateId()
              ? "Seu Perfil"
              : dataPerfil!.nome}
          </Text>
        }
      />
      {dataPerfil?.id !== getValidateId() && (
        <Appbar.Action
          onPress={() => router.navigate(`/chat/${dataPerfil?.id}`)}
          color={theme.colors.onPrimary}
          icon="message"
        />
      )}
    </Appbar.Header>
  );
}
